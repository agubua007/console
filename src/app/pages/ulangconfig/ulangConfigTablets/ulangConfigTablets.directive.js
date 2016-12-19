/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulangconfig')
      .directive('ulangConfigTablets', ulangConfigTablets);

  /** @ngInject */
  function ulangConfigTablets() {
    return {
      restrict: 'E',
      controller: 'UlangConfigTabletsCtrl',
      templateUrl: 'app/pages/ulangconfig/ulangConfigTablets/ulangConfigTablets.html'
    };
  }
})();