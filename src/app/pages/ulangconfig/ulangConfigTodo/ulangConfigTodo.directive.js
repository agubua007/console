/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulangconfig')
      .directive('ulangConfigTodo', ulangConfigTodo);

  /** @ngInject */
  function ulangConfigTodo() {
    return {
      restrict: 'EA',
      controller: 'UlangConfigTodo',
      templateUrl: 'app/pages/ulangconfig/ulangConfigTodo/ulangConfigTodo.html'
    };
  }
})();