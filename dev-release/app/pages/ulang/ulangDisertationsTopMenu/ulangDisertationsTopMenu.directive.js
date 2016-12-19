/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.ulang')
      .directive('ulangDisertationsTopMenu', ulangDisertationsTopMenu);

  /** @ngInject */
  function ulangDisertationsTopMenu() {
    return {
      restrict: 'E',
      controller: 'UlangDisertationsTopMenuCtrl',
      templateUrl: 'app/pages/ulang/ulangDisertationsTopMenu/ulangDisertationsTopMenu.html'
    };
  }
})();
