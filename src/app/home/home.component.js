(function() {
  'use strict';


  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'app/home/home.view.html',
		scope: true
  });

  /** @ngInject */
  function HomeController($http, $window) {
    var vm = this;
		vm.loading = false;



		vm.order = "top";
		vm.categories = [];
		vm.news = [];
		vm.sources = [];

		const API_KEY = '5c0e993c6bbf489aa26a01c559defd36'
		
		vm.getSources = getSources;
		vm.getArticles = getArticles;
		vm.openArticle = openArticle;		



		vm.getSources();

		function getArticles(categories, source) {
		 vm.order = categories[0];
		 vm.loading = true;
		 vm.categories = categories;
		 $http.get('https://newsapi.org/v1/articles?source=' + source + '&sortBy=top&apiKey=' + API_KEY).then(function (response) {
				vm.loading = false;			 
				vm.news = response.data.articles
		  })
		}

		function getSources() {
			console.log('getting sources');
			$http.get('https://newsapi.org/v1/sources').then(function (response) {
				console.log(response);
				vm.sources = response.data.sources;
			})
		}

		function openArticle (url) {
			$window.open(url, '_blank');		
		}
}
	
})();
