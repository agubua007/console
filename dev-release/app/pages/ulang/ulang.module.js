(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulang', [])
      .config(routeConfig)
	  .controller('UlangCtrl', UlangCtrl);
	  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ulang', {
          url: '/ulang',
          templateUrl: 'app/pages/ulang/ulang.html',
          title: 'ulang',
          sidebarMeta: {
            order: 800,
          },
		  controller: UlangCtrl
        });
  }
  
  
   function UlangCtrl($scope, fileReader, $filter, $uibModal) {
		$(".preloader").remove();
	}
  
  

})();