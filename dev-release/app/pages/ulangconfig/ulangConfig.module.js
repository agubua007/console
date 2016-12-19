(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulangconfig', [])
      .config(routeConfig)
	  .controller('UlangConfigCtrl', UlangConfigCtrl);
	  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ulangconfig', {
          url: '/ulangconfig',
          templateUrl: 'app/pages/ulangconfig/ulangConfig.html',
          title: 'ulang | config tablets',
          sidebarMeta: {
            order: 800,
          },
		  controller: UlangConfigCtrl
        });
  }
  
  
   function UlangConfigCtrl($scope, fileReader, $filter, $uibModal) {

	}
})();