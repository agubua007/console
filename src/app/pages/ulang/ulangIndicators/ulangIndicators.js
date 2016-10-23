/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulang')
      .controller('UlangIndicatorsCtrl', UlangIndicatorsCtrl);

  /** @ngInject */
  function UlangIndicatorsCtrl($scope, $timeout, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts = [{
      color: pieColor,
      descriptionl: 'Connected',
      stats: '57,820',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Listening',
      stats: '25,745',
      icon: 'person',
    },{
      color: pieColor,
      description: 'Q Receivers',
      stats: '100%',
      icon: 'face',
    },{
      color: pieColor,
      description: 'Q Tablets',
      stats: '100%',
      icon: 'face',
    }];

    $scope.indicators = [ 
      {
        color: pieColor,
        descriptionl1: 'Connected',
        descriptionl2: 'Listening',
        stats1: '57,820',
        stats2: '57,820',
        icon: 'person',
      },
      
      
      {
      color: pieColor,
      description: 'Line In',
      stats: 'Clear',
      icon: 'refresh',
    }
    ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart:not(.not)').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart:not(.not)').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();