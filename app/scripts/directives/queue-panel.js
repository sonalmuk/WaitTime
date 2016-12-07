'use strict';

/**
 * @ngdoc directive
 * @name waitTimeApp.directive:queuePanel
 * @description
 * # queuePanel
 */
angular.module('waitTimeApp')
  .directive('queuePanel', function ($location,$modal,$routeParams,ProviderService) {
    return {
      templateUrl: 'views/templates/queue-panel.html',
      restrict: 'E',
      link: function ($scope,$element) {
        //element.text('this is the queuePanel directive');
        $scope.queue={};
        $scope.currentQueue=$routeParams.name;
        $scope.error_duplicate_queue="";
        $scope.goToQueue=function(queueName){
          console.log('in go to list function');
            if(queueName)$location.path('provider/'+queueName);
            else $location.path('/provider');
        };
        var addQueueModal=$modal({
          scope:$scope,
          template:'views/templates/addqueue-modal.html',
          show:false
        });
        $scope.queues=ProviderService.query();
        $scope.showModal=function(){
          addQueueModal.$promise.then(addQueueModal.show);
        };

        $scope.createQueue=function(){
          var savd=ProviderService.save($scope.queue);
          if(!savd){
            $scope.error_duplicate_queue='Duplicate queue name, try again!';
            //$scope.addQueueForm.$valid=false; //TO DO -- find out how to set this
          }else{
            $scope.error_duplicate_queue="";
            addQueueModal.hide();
            $scope.queue={};
          }
        };


        $scope.closeQueue=function(queue){
          ProviderService.remove(queue);
          $location.path('/');
        };
      }
    };
  });
