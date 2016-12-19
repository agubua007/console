/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ulang')
      .controller('UlangDisertationsCtrl', UlangDisertationsCtrl);

    /** @ngInject */
    function UlangDisertationsCtrl($scope, $rootScope, fileReader, $filter, $uibModal, $linq, JsAdapter) {

        console.log('Show Disertations');

        //console.log(JSON.stringify($scope.dissertationsInformation));
        /*
        var current = $linq.Enumerable().From($scope.dissertationsInformation).Where(function (x) { return x.Id === res.IdActiveDissertation }).FirstOrDefault();
        if (current != null) {
            $scope.currentDissertation = current;
        } else {
            $scope.currentDissertation = {
                
            }
        }*/

/*
        $scope.currentDissertation = $scope.dissertationsInformation*/
        $scope.statusButtons = {
            active: true
        }
        $scope.buttons = {
            clickActiveDisertation: function (state) {
                console.log("click: clickActiveDisertation: " + state);
            }
        }
        
        setTimeout(function () {
            $('.table').trigger('footable_redraw');
        }, 100);
    }

})();
