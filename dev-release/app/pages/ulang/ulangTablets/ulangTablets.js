/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ulang')
        .controller('UlangTabletsCtrl', UlangTabletsCtrl);
    function UlangTabletsCtrl($scope, $rootScope, $timeout, baConfig, baUtil, $linq, $http, $q, $sce, JsAdapter, toastr, toastrConfig) {


        //#region ConsoleMessages
        $rootScope.$on('onConsoleMessageTablets', function (event, data) {
            if (data != undefined && data.message != undefined && data.message.Result) {
                var row = data.message.Response
                var tabletLocal = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === row.IdCabin && x.TabletNumber === row.TabletNumber }).FirstOrDefault();
                var add = tabletLocal == undefined;
                if (add) tabletLocal = {};
                if (!$scope.$$phase) {
                    $scope.$apply(function() {
                        updateTabletValues(tabletLocal, row);
                        if (add) $scope.info.Tablets.push(tabletLocal);
                    });
                } else {
                    updateTabletValues(tabletLocal, row);
                    if (add) $scope.info.Tablets.push(tabletLocal);
                }
            } else {
                JsAdapter.ShowToast("Error updating tablets ", "error");
            }
        });
        $rootScope.$on('onConsoleDisconnected', function (event, data) {
            JsAdapter.ShowToast(data.message, "error");
        });


        //#endregion


        $scope.info = {
            Tablets: []
        };

        function selectFlag(idLanguage) {
            var flag = idLanguage == 1 ?
                        'United-States.png' : (idLanguage == 2 ?
                                'Spain.png' :
                                'Unknown.png');
            return flag;
        }

        function loadTablets() {
            JsAdapter.GetTabletInformation().then(function (data) {
                if (!data.Result) return
                var list = data.Response;
                $(list).each(function (i, row) {
                    var tabletLocal = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === row.IdCabin && x.TabletNumber === row.TabletNumber }).FirstOrDefault();
                    var add = tabletLocal == undefined;
                    if (add) tabletLocal = {};
                    updateTabletValues(tabletLocal, row);
                    if (add) $scope.info.Tablets.push(tabletLocal);
                });
                setTimeout(function () {
                    loadTablets();
                }, 10000);

            }, function (code) {
                JsAdapter.ShowToast("Error to loading tablets, retrying...", "error");
                setTimeout(function () {
                    loadTablets();
                }, 10000);
            });
        }

        function updateTabletValues(tabletLocal, row) {
            tabletLocal.IdCabin = row.IdCabin;
            tabletLocal.TabletNumber = row.TabletNumber;
            tabletLocal.ClassConnected = row.Connected ? 'tablet-enabled' : 'tablet-disabled';
            tabletLocal.Connected = row.Connected;
            tabletLocal.Active = row.Active ? '' : '';
            tabletLocal.StateIcon = row.Indicators.GeneralState == 3 ? 'fa-check-circle' : row.Indicators.GeneralState == 2 ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';
            tabletLocal.ColorIcon = row.Indicators.GeneralState == 3 ? 'darkgreen' : row.Indicators.GeneralState == 2 ? 'orange' : 'red';
            tabletLocal.StateBlink = row.Indicators.GeneralState < 3 && row.Connected ? 'blink_me' : '';
            tabletLocal.StateRecordClass = row.RecordState ? 'btn-audio-on' : 'btn-audio-off';
            tabletLocal.StateMuteClass = row.MuteState ? 'btn-audio-on' : 'btn-audio-off';
            tabletLocal.StateListenInConsoleClass = 'btn-listen-off';
            tabletLocal.LanguageListen = selectFlag(row.IdLanaguagePlayback);
            tabletLocal.LanguageRecord = selectFlag(row.IdLanaguageRecord);
            tabletLocal.GainValue = row.GainValue;
            tabletLocal.BatteryTooltip = $sce.trustAsHtml('<span>' + row.Indicators.BatteryMessage + '</span>');
            tabletLocal.BatteryImage = row.Indicators.BatteryValue >= 0 ? 'battery-' + row.Indicators.BatteryValue + '.svg' : ('battery-0.svg');
            tabletLocal.WifiTooltip = $sce.trustAsHtml('<span>' + row.Indicators.WifiMessage + '</span>');
            tabletLocal.WifiImage = row.Indicators.WifiState >= 1 ? 'wifi-' + row.Indicators.WifiState + '.svg' : ('wifi-1.svg');
            tabletLocal.GeneralTooltip = $sce.trustAsHtml('<span>' + row.Indicators.GeneralMessage + '</span>');

            tabletLocal.StateLostPacketsClass = row.Indicators.LostPacketState ? '' : 'oculto';
            tabletLocal.StateSquareWaveClass = row.Indicators.SquareWaveState ? '' : 'oculto';
        }


        loadTablets();




        $scope.buttons = {
            clickRecord: function (idCabin, tabletNumber) {
                changeStateRecordButton(null, idCabin, tabletNumber);
            },
            clickMute: function (idCabin, tabletNumber) {
                changeStateMuteButton(null, idCabin, tabletNumber);
            },
            clickGain: function (idCabin, tabletNumber, dir) {
                changeGainValueButton(idCabin, tabletNumber, dir);
            },
            clickSwitch: function (idCabin, tabletNumber) {
                changeSwitchButton(idCabin, tabletNumber);
            },
            clickShowTablet: function (idCabin, tabletNumber) {

            },
            clickListenAudio: function (idCabin, tabletNumber) {
                changeStateListenInConsoleButton(null, idCabin, tabletNumber);
            }
        };
        function changeStateRecordButton(state, idCabin, tabletNumber) {
            var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.TabletNumber === tabletNumber }).FirstOrDefault();
            if (tablet == null)//TODO:ShowError
                return;
            if (!tablet.Connected)
                return;
            if (state == null)
                state = tablet.StateRecordClass == "btn-audio-off";

            JsAdapter.GetTabletActions(1, idCabin, tabletNumber).then(function (res) {
                if (!res.Result) {
                    JsAdapter.ShowToast("Error performing the requested action", "error");
                }
            }, function (err) {
                JsAdapter.ShowToast("Error performing the requested action", "error");
            })


        }
        function changeStateMuteButton(state, idCabin, tabletNumber) {
            var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.TabletNumber === tabletNumber }).FirstOrDefault();
            if (tablet == null)//TODO:ShowError
                return;
            if (!tablet.Connected)
                return;
            if (state == null)
                state = tablet.StateMuteClass == "btn-audio-off";
            if (tablet.StateRecordClass != "btn-audio-on") {
                JsAdapter.ShowToast("The tablet must be transmitting to mute", "info");
                return;
            }
            JsAdapter.GetTabletActions(2, idCabin, tabletNumber).then(function (res) {
                if (!res.Result) {
                    JsAdapter.ShowToast("Error performing the requested action", "error");
                }
            }, function (err) {
                JsAdapter.ShowToast("Error performing the requested action", "error");
            })
        }
        function changeGainValueButton(idCabin, tabletNumber, dir, value) {
            var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.TabletNumber === tabletNumber }).FirstOrDefault();
            if (tablet == null)//TODO:ShowError
                return;
            if (!tablet.Connected)
                return;
            if (dir == null && value != undefined) {
                tablet.GainValue = value;
                return;
            }
            if ((tablet.GainValue <= 0.25 && dir === '-') || (tablet.GainValue >= 5 && dir === '+')) {
                JsAdapter.ShowToast("The min value of gain is 0.25 and max is 5", "info");
                return;
            }
            JsAdapter.GetTabletActions(dir === '-' ? 6 : 5, idCabin, tabletNumber).then(function (res) {
                if (!res.Result) {
                    JsAdapter.ShowToast("Error performing the requested action", "error");
                }
            }, function (err) {
                JsAdapter.ShowToast("Error performing the requested action", "error");
            })
        }
        function changeSwitchButton(idCabin, tabletNumber) {
            var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.TabletNumber === tabletNumber }).FirstOrDefault();
            if (tablet == null)//TODO:ShowError
                return;
            if (!tablet.Connected)
                return;

            JsAdapter.GetTabletActions(4, idCabin, tabletNumber).then(function (res) {
                if (!res.Result) {
                    JsAdapter.ShowToast("Error performing the requested action", "error");
                }
            }, function (err) {
                JsAdapter.ShowToast("Error performing the requested action", "error");
            })


        }
        function changeStateListenInConsoleButton(state, idCabin, tabletNumber) {
            var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.TabletNumber === tabletNumber }).FirstOrDefault();
            if (tablet == null)//TODO:ShowError
                return;
            if (!tablet.Connected)
                return;
            if (state == null)
                state = tablet.StateListenInConsoleClass == "btn-listen-off";
            JsAdapter.GetTabletActions(7, idCabin, tabletNumber).then(function (res) {
                if (!res.Result) {
                    JsAdapter.ShowToast("Error performing the requested action", "error");
                }
            }, function (err) {
                JsAdapter.ShowToast("Error performing the requested action", "error");
            })
        }
    }
})();
