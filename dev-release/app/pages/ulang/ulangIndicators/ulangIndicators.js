/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ulang')
        .controller('UlangIndicatorsCtrl', UlangIndicatorsCtrl);

    /** @ngInject */
    function UlangIndicatorsCtrl($scope, $rootScope, $timeout, baConfig, baUtil, $linq, JsAdapter) {
        $scope.indicators = {
            Receivers: {
                CountListening: 0,
                CountConnected: 0,
                Class: ''
            },
            QReceivers: {
                CountReceiversBatteryUnder50: 0,
                CountReceiversWifiUnder50: 0,
                CountReceiversWithLostPackets: 0,
                CountReceiversBatteryAbove50: 0,
                CountReceiversWifiAbove50: 0,
                Class: ''
            },
            QTablets: {
                State: "Unknown",
                Class: ''
            },
            LineIn: {
                Quality: "Unknown",
                Class: ''
            }
        }

        function loadIndicators(ind) {
            //#region Receivers
            $scope.indicators.Receivers.CountConnected = ind.Switcher.CountReceiversConnected;
            var countListening = $linq.Enumerable().From(ind.Streamers).Sum(function (x) { return x.CountReceiversListening });
            $scope.indicators.Receivers.CountListening = countListening;
            $scope.indicators.Receivers.Class = "";
            //#endregion


            //#region QReceivers
            $scope.indicators.QReceivers.CountReceiversBatteryUnder50 = ind.Switcher.CountReceiversBatteryUnder50;
            $scope.indicators.QReceivers.CountReceiversWifiUnder50 = ind.Switcher.CountReceiversWifiUnder50;
            $scope.indicators.QReceivers.CountReceiversWithLostPackets = ind.Switcher.CountReceiversWithLostPackets;
            $scope.indicators.QReceivers.CountReceiversBatteryAbove50 = ind.Switcher.CountReceiversBatteryAbove50;
            $scope.indicators.QReceivers.CountReceiversWifiAbove50 = ind.Switcher.CountReceiversWifiAbove50;

            //#endregion

            //#region QTablets
            $scope.indicators.QTablets.State = ind.Switcher.TabletsState == 3 ? "Good" :
                ind.Switcher.TabletsState == 2 ? "Bad" :
                ind.Switcher.TabletsState == 1 ? "Warning" :
                ind.Switcher.TabletsState == -1 ? "Error" :
                ind.Switcher.TabletsState == -2 ? "Tablet Off" : "Unknown";
            //#endregion

            //#region LineIn
            $scope.indicators.LineIn.Quality = ind.Switcher.LineInState && ind.Switcher.LineIn ? "Ok, Clear" :
                !ind.Switcher.LineInState ? "Bad Signal" :
                !ind.Switcher.LineIn ? "Distorted" : "";
            //#endregion
        }


        //#region ConsoleMessages
        $rootScope.$on('onConsoleMessageIndicators', function (event, data) {
            if (data != undefined && data.message != undefined && data.message.Result) {
                var ind = data.message.Response;
                if (ind.Switcher != null && ind.Streamers != null) {
                    {
                        if (!$scope.$$phase) {
                            $scope.$apply(function () {
                                loadIndicators(ind);
                            });
                        }
                        else loadIndicators(ind);
                    }
                    
                }
            } else {
                JsAdapter.ShowToast("Error updating indicators ", "error");
            }
        });
        //#endregion


    }
})();