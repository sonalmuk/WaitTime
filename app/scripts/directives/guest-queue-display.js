'use strict';

/**
 * @ngdoc directive
 * @name waitTimeApp.directive:guestQueueDisplay
 * @description
 * # guestQueueDisplay
 */
angular.module('waitTimeApp')
  .directive('guestQueueDisplay', function ($timeout,ProviderService) {
    return {

      restrict: 'EA',
      scope:{designateToQueue:"="},
      templateUrl: 'views/templates/waitlist-view-template.html',
      link: function (scope, element, attrs) {
      //  element.text('this is the guestQueueDisplay directive');

        scope.queues=ProviderService.query();

        //scope.providerWindow=[{"window1":""},{"window2":""},{"window3":""}];
        scope.sendToWindow=function(queue){
          if(queue.name==="register"){
            //scope.providerWindow["window1"]=queue.guests[0];
            ProviderService.matchRequest("window1",queue);
          }
          if(queue.name==="license" || queue.name==="platechange")ProviderService.matchRequest("window2",queue);
        };

      }
    };
  });
