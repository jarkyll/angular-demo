(function() {
  'use strict';


  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'app/home/home.view.html',
		scope: true
  });

  /** @ngInject */
  function HomeController($log, $translate, $http, SAMPLE_CONSTANT) {
    var vm = this;
		vm.addItem = '';
		vm.deleteItem = '';
    vm.greeting = '';
    vm.items = ['potato'];
		vm.showModal = false;
		vm.news = [];

		const API_KEY = '5c0e993c6bbf489aa26a01c559defd36'

    vm.showSampleConstant = showSampleConstant;
    vm.switchLanguage = switchLanguage;
    vm.alertUser = alertUser;
    vm.addTodo = addTodo;
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.deleteTodo = deleteTodo
		vm.get = get;
	

    function showSampleConstant() {
      alert(SAMPLE_CONSTANT);
    }

    function switchLanguage(language) {
      $translate.use(language);
    }

    function alertUser() {
      alert('This is the alert');
    }

    function addTodo(e) {
	  	if (vm.addItem !== '' && (e == null || e.key === "Enter")) {
			vm.items.push(vm.addItem);
			vm.addItem = '';
	 	 }
    }

	function openModal(item, index) {
		vm.showModal = true;		
		vm.deleteItem = item;
		vm.deleteIndex = index;
	}
	
	function closeModal () {
	  vm.deleteItem = null;
	  vm.deleteIndex = null;
	  vm.showModal = false;	
	}

  function editTodo(item, index) {
    vm.items[index] = item
  }

  function deleteTodo() {
    vm.items.splice(vm.deleteIndex,1)
	  closeModal()
  }

	function get() {
	 console.log('test')
	 console.log($http)
	 $http.get('https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=' + API_KEY).then(function (response) {
	   vm.news = response.data.articles
    })
	}
}
	
})();
