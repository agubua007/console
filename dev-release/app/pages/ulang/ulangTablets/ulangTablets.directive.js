/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulang')
    .directive('ulangTablets', ulangTablets)

  /** @ngInject */
  function ulangTablets() {
    return {
      restrict: 'E',
      controller: 'UlangTabletsCtrl',
      templateUrl: 'app/pages/ulang/ulangTablets/ulangTablets.html'
    };
  }


  
})();