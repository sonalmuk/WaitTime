'use strict';

/**
 * @ngdoc directive
 * @name waitTimeApp.directive:guestPanel
 * @description
 * # guestPanel
 */
angular.module('waitTimeApp')
  .directive('guestPanel', function (ProviderService) {
    return {
      templateUrl: 'views/templates/guestrequest-template.html',
      restrict: 'E',
      link: function ($scope,$element) {
      //element.text('this is the guestPanel directive');

        //$scope.guest = {"queue_name":"test4","wait":5,"window":1};
      //  $scope.guest = {"wait":5,"window":1};
        $scope.queues=ProviderService.query();
        $scope.guest={};
        var d = new Date();
        var STANDARD_WAIT_TIME=10; //15 mniutes wait time for all services
        //$element.text('$scope.queues'+JSON.stringify($scope.queues));
        $scope.addToQueue=function(){
          console.log('add to queue'+ $scope.selectedItem.name);

          var thisQueue=ProviderService.queryByName($scope.selectedItem.name);
          //console.log('g ' + JSON.stringify(thisQueue[0].guests.length) + 'len ');
          console.log('only license is returned ' + JSON.stringify(thisQueue.guests.length) + 'len ');
          var position=(thisQueue.guests.length===0?1:thisQueue.guests.length+1);
          var waitHr=Math.floor((STANDARD_WAIT_TIME*position)/60);
          //var waitMin="";
          var waitTime=d.setMinutes(d.getMinutes()+(STANDARD_WAIT_TIME*position));//(STANDARD_WAIT_TIME*position)/60 +'hr'+(STANDARD_WAIT_TIME*position)%60 +'min';
          //console.log('new Date(waitTime)' + new Date(waitTime));
          var eta=new Date(waitTime);
          //console.log('thisQueue' + JSON.stringify(thisQueue)+ 'thisQueue.guests.length ' + JSON.stringify(thisQueue.guests.length));
          $scope.guest={"phoneNumber":$scope.guest.phoneNumber,
                        "position": position,
                        "totalMinutes":STANDARD_WAIT_TIME*position,
                        "wait":waitHr +'hr'+(STANDARD_WAIT_TIME*position)%60 +'min',
                        "ETA":eta,
                        "windowNumber":""};
          ProviderService.addGuest($scope.guest,$scope.selectedItem);
          $scope.guest={};
          //d="";
          //eta="";
          //waitTime="";
        };
        $scope.removeFromQueue=function(){
          console.log('remove from queue'+JSON.stringify($scope.guest)+', '+JSON.stringify($scope.selectedItem.name));
          ProviderService.removeGuest($scope.guest,$scope.selectedItem.name);
        }
      }
    };
  });
