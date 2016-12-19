(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login', [])
      .config(routeConfig)
	  .controller('LoginCtrl', ['authService', 'ngAuthSettings', LoginCtrl]);
	  
	  
	  
	   

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/pages/login/login.html',
          title: 'ulang | login',
          sidebarMeta: {
            order: 800,
          },
		  controller: LoginCtrl
        });
  }
  
  
   function LoginCtrl($scope, authService, ngAuthSettings, fileReader, $filter, $uibModal) {
		$scope.loginData = {
			userName: "",
			password: "",
			useRefreshTokens: false
		};
		$scope.login = function () {
			/*if (!validateForm($('form')[0])) {
				return;
			}*/
            document.location.href = '../#!/ulangsystem';
            /*
			authService.login($scope.loginData).then(function (response) {
				document.location.href = '../#!/ulangsystem';
				
				//document.location.href = 'http://localhost:65501/api/Dashboard/GetConfiguration';

			}, function (err) {
				if (err == null) {
					//showMessage($filter('translate')('REGISTER_MENSSAGE_REGFAIL_DEF'), "Error", "error");
				} else {
					//showMessage($filter('translate')(err.error_description), "Error", "error");
				}
			});
            */
		};
	}
})();