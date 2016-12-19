/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.ulang')
      .directive('ulangDisertations', ulangDisertations);

  /** @ngInject */
  function ulangDisertations() {
    return {
      restrict: 'E',
      controller: 'UlangDisertationsCtrl',
      templateUrl: 'app/pages/ulang/ulangDisertations/ulangDisertations.html'
    };
  }
})();
