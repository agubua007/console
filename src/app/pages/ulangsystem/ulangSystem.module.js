(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ulangsystem', [])
      .config(routeConfig)
	  .controller('UlangSystemCtrl', UlangSystemCtrl);
	  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ulangsystem', {
          url: '/ulangsystem',
          templateUrl: 'app/pages/ulangsystem/ulangSystem.html',
          title: 'ulang | Config',
          sidebarMeta: {
            order: 800,
          },
		  controller: UlangSystemCtrl
        });
  }
  
  
   function UlangSystemCtrl($scope, fileReader, $filter, $uibModal) {
       $("#audioSelect").change(function() {
           var val =  $("#audioSelect").val();

            switch(val){
                case "1":
                    $(".fila-op-2, .fila-op-3, .fila-op-4, .fila-op-5").hide();
                    $(".fila-op-1").show();
                    break;
                case "2":
                    $(".fila-op-1, .fila-op-3, .fila-op-4, .fila-op-5").hide();
                    $(".fila-op-2").show();
                    break;
                case "3":
                    $(".fila-op-1, .fila-op-2, .fila-op-4, .fila-op-5").hide();
                    $(".fila-op-3").show();
                    break;
                case "4":
                    $(".fila-op-1, .fila-op-2, .fila-op-3, .fila-op-5").hide();
                    $(".fila-op-4").show();
                    break;
                case "5":
                    $(".fila-op-1, .fila-op-2, .fila-op-3, .fila-op-4").hide();
                    $(".fila-op-5").show();
                    break;
                default:
                    $(".fila-op-2, .fila-op-3, .fila-op-4, .fila-op-5").hide();
                    $(".fila-op-1").show();
                    break;
            }
        });
       
       $scope.config = function () {
         document.location.href = '/#/ulangconfig';  
       };
	}
})();