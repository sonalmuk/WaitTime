'use strict';

/**
 * @ngdoc function
 * @name waitTimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the waitTimeApp
 */
angular.module('waitTimeApp')
  .controller('MainCtrl', function ($scope,$location,ProviderService) {
    $scope.queues=ProviderService.query();

    $scope.$watch(function(){
      return $location.path();
    },
    function(path){
      if(path.indexOf('provider')!=-1){
          $scope.activeView='provider';
      }else {
         $scope.activeView='requester';
      }
    });

  });
