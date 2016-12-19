/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulang')
      .directive('ulangIndicators', ulangIndicators);

  /** @ngInject */
  function ulangIndicators() {
    return {
      restrict: 'E',
      controller: 'UlangIndicatorsCtrl',
      templateUrl: 'app/pages/ulang/ulangIndicators/ulangIndicators.html'
    };
  }
})();