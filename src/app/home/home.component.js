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


		vm.currentSource = "";
		vm.order = "top";
		vm.categories = [];
		vm.news = [];
		vm.sources = [];

		const API_KEY = '5c0e993c6bbf489aa26a01c559defd36'
		
		vm.getSources = getSources;
		vm.getArticles = getArticles;
		vm.openArticle = openArticle;		



		vm.getSources();

		function getArticles(source, order, categories) {
		 
		 if (categories != null) {
		 	vm.order = categories[0];
			vm.categories = categories;
		 }
		
		 vm.loading = true;
		 vm.currentSource = source;
		 $http.get('https://newsapi.org/v1/articles?source=' + source + '&sortBy=' + order + '&apiKey=' + API_KEY).then(function (response) {
				vm.loading = false;			 
				vm.news = response.data.articles
				vm.news.forEach(function (value, index) { 
					var date = new Date(value.publishedAt);
					value.publishedAt = date.toDateString();				
				})
		  })
		}

		function getSources() {
			$http.get('https://newsapi.org/v1/sources').then(function (response) {
				vm.sources = response.data.sources;
			})
		}

		function openArticle (url) {
			$window.open(url, '_blank');		
		}
}
	
})();
