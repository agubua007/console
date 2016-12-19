'use strict';

var app = angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  'ui.footable',
  'datatables',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'ngCookies',
  'LocalStorageModule',
  'angular-progress-button-styles',
  'angular-linq',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.services'
]);



var serviceBase = 'http://localhost:65501/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.config(function($sceProvider) {
    $sceProvider.enabled(false);
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);