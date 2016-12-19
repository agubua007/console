/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ulang')
      .controller('UlangDisertationsTopMenuCtrl', UlangDisertationsTopMenuCtrl);

    /** @ngInject */
    function UlangDisertationsTopMenuCtrl($scope, $rootScope, fileReader, $filter, $uibModal, $linq, JsAdapter) {



        //#region ConsoleMessages
        $rootScope.$on('onConsoleMessageDissertations', function (event, data) {
            if (data != undefined && data.message != undefined && data.message.Result) {

                var action = data.message.Response
                if (action.Type == "DissertationChanged") {
                    $scope.dissertationsInformation.IdActiveDissertation = action.Id;
                    loadInfoDissertations($scope.dissertationsInformation, true);
                    JsAdapter.ShowToast('dissertation changed', 'success');
                }
            } else {
                JsAdapter.ShowToast("Error updating dissertations ", "error");
            }
        });
        $rootScope.$on('onConsoleDisconnected', function (event, data) {
            JsAdapter.ShowToast(data.message, "error");
        });


        //#endregion



        //#region Actions
        function gotoPreviousDissertation() {
            var selectedIdDiss = $scope.dissertationsInformation.IdActiveDissertation;
            var prev = $linq.Enumerable().From($scope.dissertationsInformation.Dissertations).Where(function (x) { return x.Id < selectedIdDiss }).OrderByDescending(function (x) { return x.Id }).FirstOrDefault();
            if (prev == null) {
                JsAdapter.ShowToast('No more dissertations', 'info');
                return;
            }
            swal({
                title: 'Are you sure?',
                text: "Will move on to the previous dissertation",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, move!'
            }).then(function () {
                JsAdapter.ChangeToDissertation(prev.Id).then(function () {
                    //$scope.dissertationsInformation.IdActiveDissertation = prev.Id;
                    //loadInfoDissertations($scope.dissertationsInformation, true);
                    //JsAdapter.ShowToast('dissertation changed', 'success');
                }, function () {
                    JsAdapter.ShowToast('Error trying to change the dissertation', 'error');
                });
            });
        }
        function gotoShowDisertations() {
            var page = 'app/pages/ulang/ulangDisertations/modalTemplates/ulangDisertationsModal.html';
            var size = 'xlg';
            $uibModal.open({
                animation: true,
                templateUrl: page,
                //controller: 'UlangDisertationsCtrl',
                size: size,
                scope: $scope,
                resolve: {
                    infoDissertations: function () {
                        return $scope.dissertationsInformation;
                    }
                }
            });
        }
        function gotoNextDissertation() {
            var selectedIdDiss = $scope.dissertationsInformation.IdActiveDissertation;
            var next = $linq.Enumerable().From($scope.dissertationsInformation.Dissertations).Where(function (x) { return x.Id > selectedIdDiss }).FirstOrDefault();
            if (next == null) {
                JsAdapter.ShowToast('No more dissertations', 'info');
                return;
            }
            swal({
                title: 'Are you sure?',
                text: "Will move on to the next dissertation",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, move!'
            }).then(function () {
                JsAdapter.ChangeToDissertation(next.Id).then(function () {
                    //$scope.dissertationsInformation.IdActiveDissertation = next.Id;
                    //loadInfoDissertations($scope.dissertationsInformation, true);
                    //JsAdapter.ShowToast('dissertation changed', 'success');
                }, function () {
                    JsAdapter.ShowToast('Error trying to change the dissertation', 'error');
                });
            });
        }
        //#endregion

        //#region Model
        $scope.previusDissertation = {
            firstSpeaker: {
                Name: '',
                SImage: ''
            }
        }

        $scope.currentDissertation = {
            Name: '',
            SFrom: '',
            STo: '',
            PercentageCompleted: '30',
            firstSpeaker: {
                Name: '',
                SImage: ''
            }
        }

        $scope.nextDissertation = {
            firstSpeaker: {
                Name: '',
                SImage: ''
            }
        }

        $scope.clickPreviousDissertation = function () {
            gotoPreviousDissertation();
        }
        $scope.clickShowDisertations = function () {
            gotoShowDisertations();
        }
        $scope.clickNextDissertation = function () {
            gotoNextDissertation();
        }
        //#endregion


        JsAdapter.GetDissertationsInformation().then(function (data) {
            var res = data.Response;
            $scope.dissertationsInformation = res;
            $scope.listIdDisertationsOrder = $linq.Enumerable().From(res.Dissertations).Select(function (x) { return x.Id }).ToArray();
            loadInfoDissertations(res, false);

        }, function () {
            JsAdapter.ShowToast("Error obtaining the information of the dissertations ", "error");
        });


        //#region Private Methods
        function loadInfoDissertations(res, apply) {
            var current = $linq.Enumerable().From(res.Dissertations).Where(function (x) { return x.Id === res.IdActiveDissertation }).FirstOrDefault();
            if (current == null)
                current = $linq.Enumerable().From(res.Dissertations).FirstOrDefault();
            if (current != null) {
                $scope.currentDissertation = createInfoDissertations(current);

                var previous = $linq.Enumerable().From(res.Dissertations).Where(function (x) { return x.Id < res.IdActiveDissertation }).OrderByDescending(function (x) { return x.Id }).FirstOrDefault();
                $scope.previousDissertation = createInfoDissertations(previous);

                var next = $linq.Enumerable().From(res.Dissertations).Where(function (x) { return x.Id > res.IdActiveDissertation }).FirstOrDefault();
                $scope.nextDissertation = createInfoDissertations(next);
            }
            if (apply && !$scope.$$phase)
                $scope.$apply();
        }
        function createInfoDissertations(diss) {
            if (diss == null)
                return {
                    Name: '',
                    Disabled: 'disabled',
                    firstSpeaker: {
                        Name: "None",
                        SImage: 'assets/img/avatars/generic.png'
                    }
                }
            var spk = $linq.Enumerable().From(diss.Speakers).FirstOrDefault();
            return {
                Name: diss.Name,
                Disabled: '',
                SFrom: diss.From.split("T")[1],
                STo: diss.To.split("T")[1],
                PercentageCompleted: diss.PercentageCompleted,
                firstSpeaker: {
                    Name: spk.Name,
                    SImage: 'data:image/png;base64,{0}'.f(spk.SImage)
                }
            }
        }

        //#endregin
    }
})();
