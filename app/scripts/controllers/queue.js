'use strict';

/**
 * @ngdoc function
 * @name waitTimeApp.controller:QueuectrlCtrl
 * @description
 * # QueuectrlCtrl
 * Controller of the waitTimeApp
 */
angular.module('waitTimeApp')
  .controller('QueuectrlCtrl', function ($scope,$interval,ProviderService) {

    $scope.providerWindows=ProviderService.getWindows();
    $scope.designateToQueue=true;
    var currentQueue=ProviderService.queryByName("license");

    $scope.freeWindow=function(windowNumber){
      //ProviderService.clearWindows(windowNumber);

      var promise=ProviderService.clearGuestFromWindow(windowNumber);
          promise.then(function (){
               console.log('you can send the new guest now');
               //debugger;
               alert(windowNumber + 'open for next guest in line');
             }, function(error){
                console.log('error');
             })
           .then(function(){
               ProviderService.matchRequest(windowNumber,currentQueue); //TO DO -- remove hard-coded queue name, it should be the object not just string of the queue name
             },function(error){
               console.log('error');
             })
           .finally(function(){
             console.log('complete');
           })
    };

  });
