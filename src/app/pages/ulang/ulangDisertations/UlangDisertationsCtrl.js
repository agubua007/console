/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulang')
    .controller('UlangDisertationsCtrl', UlangDisertationsCtrl);

  /** @ngInject */
  function UlangDisertationsCtrl($scope, fileReader, $filter, $uibModal) {

    console.log('cargamos footable');
    $scope.listDisertations = [
      {
        id: 1,
        name: 'Haga crecer su negocio en linea',
        datefrom:  new Date('2016-06-15 16:30'),
        dateto:  new Date('2016-06-15 17:30'),
        duration: '60 min',
        selected: true
      },
      {
        id: 2,
        name: 'Disertation 2',
        datefrom:  new Date('2016-06-18 16:30'),
        dateto:  new Date('2016-06-18 20:30'),
        duration: '130 min',
        selected: false
      },
      {
        id: 3,
        name: 'Disertation 3',
        datefrom:  new Date('2016-06-22 16:30'),
        dateto:  new Date('2016-06-22 18:30'),
        duration: '250 min',
        selected: false
      }
    ];

    setTimeout(function(){
        $('.table').trigger('footable_redraw');
    }, 100);
  }

})();
