/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulangconfig')
      .controller('UlangConfigTabletsCtrl', UlangConfigTabletsCtrl);
  function UlangConfigTabletsCtrl($scope, $timeout, baConfig, baUtil,$linq) {
    
	$scope.info = {
		Tablets: [
			{
				IdCabin: 1,
				IdTablet: 1,
				Active: 'tablet-enabled',
				StateIcon: 'fa-exclamation-circle',
				StateBlink: 'blink_me',
				StateRecordClass: 'btn-audio-off',
				StateMuteClass: 'btn-audio-on',
				StateListenInConsoleClass: 'btn-listen-off',
				LanguageListen: 'Spain.png',
				LanguageRecord: 'United-States.png',
				GainValue: 7,
				BaterryPercentageValue: 10,
				BatteryImage: 'battery-2',
				WifiPercentageValue: 98,
				WifiImage: 'wifi'
			},
			{
				IdCabin: 1,
				IdTablet: 2,
				Active: 'tablet-enabled',
				StateIcon: 'fa-exclamation-circle',
				StateBlink: 'blink_me',
				StateRecordClass: 'btn-audio-off',
				StateMuteClass: 'btn-audio-on',
				StateListenInConsoleClass: 'btn-listen-off',
				LanguageListen: 'Spain.png',
				LanguageRecord: 'United-States.png',
				GainValue: 7,
				BaterryPercentageValue: 10,
				BatteryImage: 'battery-2',
				WifiPercentageValue: 98,
				WifiImage: 'wifi'
			},
			{
				IdCabin: 2,
				IdTablet: 1,
				Active: 'tablet-enabled',
				StateIcon: 'fa-exclamation-circle',
				StateBlink: 'blink_me',
				StateRecordClass: 'btn-audio-off',
				StateMuteClass: 'btn-audio-on',
				StateListenInConsoleClass: 'btn-listen-off',
				LanguageListen: 'Spain.png',
				LanguageRecord: 'United-States.png',
				GainValue: 7,
				BaterryPercentageValue: 10,
				BatteryImage: 'battery-2',
				WifiPercentageValue: 98,
				WifiImage: 'wifi'
			},
			{
				IdCabin: 2,
				IdTablet: 2,
				Active: 'tablet-enabled',
				StateIcon: 'fa-exclamation-circle',
				StateBlink: 'blink_me',
				StateRecordClass: 'btn-audio-off',
				StateMuteClass: 'btn-audio-on',
				StateListenInConsoleClass: 'btn-listen-off',
				LanguageListen: 'Spain.png',
				LanguageRecord: 'United-States.png',
				GainValue: 7,
				BaterryPercentageValue: 10,
				BatteryImage: 'battery-2',
				WifiPercentageValue: 98,
				WifiImage: 'wifi'
			}
		]
	};
	
	
	$scope.buttons = {
		clickRecord: function(idCabin, idTablet){
			changeStateRecordButton(null, idCabin, idTablet);
		},
		clickMute: function(idCabin, idTablet){
			changeStateMuteButton(null, idCabin, idTablet);
		},
		clickGain: function(idCabin, idTablet, dir){
			changeGainValueButton(idCabin, idTablet, dir);
		},
		clickSwitch: function(idCabin, idTablet){
			changeSwitchButton(idCabin, idTablet);
		},
		clickShowTablet: function(idCabin, idTablet){
			
		},
		clickListenAudio: function(idCabin, idTablet){
			changeStateListenInConsoleButton(null, idCabin, idTablet);
		}
	};
	
	function changeStateRecordButton(state, idCabin, idTablet)
	{
		var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.IdTablet === idTablet }).FirstOrDefault();
		if(tablet == null)//TODO:ShowError
			return;
		if(state == null)
			state = tablet.StateRecordClass == "btn-audio-off";
		tablet.StateRecordClass = state  ? "btn-audio-on" : "btn-audio-off";
	}
	function changeStateMuteButton(state, idCabin, idTablet)
	{
		var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.IdTablet === idTablet }).FirstOrDefault();
		if(tablet == null)//TODO:ShowError
			return;
		if(state == null)
			state = tablet.StateMuteClass == "btn-audio-off";
		tablet.StateMuteClass = state  ? "btn-audio-on" : "btn-audio-off";
	}
	function changeGainValueButton(idCabin, idTablet, dir, value)
	{
		var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.IdTablet === idTablet }).FirstOrDefault();
		if(tablet == null)//TODO:ShowError
			return;
		if(dir == null && value != undefined){
			tablet.GainValue = value;
			return;
		}
		if((tablet.GainValue <= 0 && dir === '-') || (tablet.GainValue >= 15 && dir === '+'))
			return;
		tablet.GainValue = tablet.GainValue + (dir === '-' ? (-1) : 1);
	}
	function changeSwitchButton(idCabin, idTablet)
	{
		var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.IdTablet === idTablet }).FirstOrDefault();
		if(tablet == null)//TODO:ShowError
			return;
		var aux = tablet.LanguageListen;
		tablet.LanguageListen = tablet.LanguageRecord;
		tablet.LanguageRecord = aux;
	}
	function changeStateListenInConsoleButton(state, idCabin, idTablet)
	{
		var tablet = $linq.Enumerable().From($scope.info.Tablets).Where(function (x) { return x.IdCabin === idCabin && x.IdTablet === idTablet }).FirstOrDefault();
		if(tablet == null)//TODO:ShowError
			return;
		if(state == null)
			state = tablet.StateListenInConsoleClass == "btn-listen-off";
		tablet.StateListenInConsoleClass = state  ? "btn-listen-on" : "btn-listen-off";
	}
	
  }
})();
