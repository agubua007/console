/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardLineChart2', dashboardLineChart);

  /** @ngInject */
  function dashboardLineChart() {
    return {
      restrict: 'E',
      controller: 'DashboardLineChart2Ctrl',
      templateUrl: 'app/pages/dashboard/dashboardLineChart2/dashboardLineChart2.html'
    };
  }
})();