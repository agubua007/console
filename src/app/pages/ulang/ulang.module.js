(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulang', [])
      .config(routeConfig);

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
        });
  }

})();