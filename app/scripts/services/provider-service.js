'use strict';

/**
 * @ngdoc service
 * @name waitTimeApp.ProviderService
 * @description
 * # ProviderService
 * Service in the waitTimeApp.
 */
angular.module('waitTimeApp')
  .service('ProviderService', function ProviderService($interval,$timeout,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var RECALCULATE_EVERY_N_MINUTES=5;
    var CLEAR_WINDOW=15;
    var loadModel=function(){
        var model={
          queues:localStorage['waitTime.queues']?JSON.parse(localStorage['waitTime.queues']):[],
          nextId:localStorage['waitTime.nextId']?parseInt(localStorage['waitTime.nextId']):0
      //    windowServing:localStorage['waitTime.windowServing']?JSON.parse(localStorage['waitTime.windowServing']):""
      }
      return model;
    };
    var saveModel=function(){
      localStorage['waitTime.queues']=JSON.stringify(Model.queues);
      localStorage['waitTime.nextId']=Model.nextId;
    //  localStorage['waitTime.windowServing']=JSON.stringify(windows);
    };

    var findById=function(listId){
      return _.find(Model.queues,function(queue){
          return queue.id===listId;
      });
    };
    var findByName=function(name){
      return _.find(Model.queues,function(queue){
          return queue.name===name;
      });
    };
   //var windows=[{"window1":""},{"window2":""},{"window3":""}];
   var windows=[{"windowName":"window1","serving":""},{"windowName":"window2","serving":""}];
   var matchWindow=function(windowName){
     return _.find(windows,function(window){
       return window.windowName===windowName;
     });
   };
   this.getWindows=function(){
     return windows;
   };
   this.clearWindows=function(windowNumber){
     //console.log(windowNumber + JSON.stringify(windows[windowNumber]));
     //windows.windowName[windowNumber]===undefined;
     var windowToClear=matchWindow(windowNumber);
     windowToClear["serving"]="";
     //console.log(windowNumber + JSON.stringify(windows[windowNumber]));
   };
   //the below function does the same thing as this.clearWindows, it is an attempt to apply promise concept
   this.clearGuestFromWindow=function(windowNumber){
     var deferred=$q.defer();
     $timeout(function(){
       var windowToClear=matchWindow(windowNumber);
       windowToClear["serving"]="";
       deferred.resolve('window cleared');
     },2000);

     return deferred.promise;
   }
   var assignToWindow=function(windowNumber,queueName){
    // var lookUpQueue=findByName(queueName);
     var windowToSendGuest=matchWindow(windowNumber);
      if(windowToSendGuest.serving===""){
       windowToSendGuest["serving"]=queueName.guests[0].phoneNumber;
       queueName.guests.splice(0,1);
         _.forEach(queueName.guests,function(guest){
           guest.position--;
         });
       console.log(windowNumber + JSON.stringify(windowToSendGuest));
       saveModel();
       return true;
    }else return false;
   };
   this.recalculatePosition=function(){

   };
   this.matchRequest=function(windowNumber,queue){//this public function calls private function assignToWindow
    // console.log(JSON.stringify(windows.window1));
    // this.recalculateWaitTime();
     assignToWindow(windowNumber,queue);
    // console.log(JSON.stringify(windows.window1));
   };

    this.recalculateWaitTime=function(){
      console.log('calling');
      /*  $scope.guest={"phoneNumber":$scope.guest.phoneNumber,
                      "position": position,
                      "wait":waitHr +'hr'+(STANDARD_WAIT_TIME*position)%60 +'min',
                      "ETA":eta};*/
        _.forEach(Model.queues,function(queue){
          _.forEach(queue.guests,function(guest){
                var currentETA=new Date(guest.ETA);
                /*"totalMinutes":STANDARD_WAIT_TIME*position,
                "wait":waitHr +'hr'+(STANDARD_WAIT_TIME*position)%60 +'min',
                */
                //guest.totalMinutes=guest.totalMinutes.getMinutes(guest.totalMinutes)-5;
                //if(guest.totalMinutes>5){
                    var recalcwaittime=guest.totalMinutes-5;
                    recalcwaittime=Math.floor(recalcwaittime/60)+'hr'+ recalcwaittime%60 + 'min';
                    guest.wait=recalcwaittime;
                    guest.totalMinutes=guest.totalMinutes-5;
                //}else if(guest.totalMinutes<=5){
                //    guest.totalMinutes=guest.totalMinutes+5;
                //}
                guest.ETA=new Date(currentETA.setMinutes(currentETA.getMinutes()-5));
                saveModel();
          });
        });

    };
    this.addGuest=function(guest,queueName){
      var indexOfQueue=_.findIndex(Model.queues,function(queue){
         return queue.name==queueName.name;
      });
    //  console.log(guest + ' ' +JSON.stringify(Model.queues[3]));
    //  if(foundQueue){
        Model.queues[indexOfQueue].guests.push(guest);
      //}else{
        saveModel();
      //}
    }
    this.removeGuest=function(theGuest,queueName){
      var thisQueue=_.find(Model.queues,function(queue){
        return queue.name===queueName.name;
      });
      console.log('queue to look up' + JSON.stringify(thisQueue));
      if(thisQueue){
      /*var newlist=  _.remove(thisQueue,function(guest){
          console.log('about to remove'+ guest.phoneNumber);
           return guest.phoneNumber===phoneNumber;
        });
      };*/
       _.remove(thisQueue.guests,function(guest){
        // console.log('que number '+ guest.phoneNumber + ' result '+ theGuest.phoneNumber);
           return guest.phoneNumber===theGuest.phoneNumber;
       });
      }
      saveModel();

    }
    this.save=function(queue){//this 'queue ' is from the view where there is an input for queue name
      queue.id=Model.nextId++;
      if(!findByName(queue.name)){
        Model.queues.push(queue);
        queue.guests=[];
        saveModel();
        return true;
      }else {
        console.log('duplicate queue name'); //add a directive for displaying system related error message
        return false;
      }

    };
    this.queryByName=function(listName){
      if(listName){
        return findByName(listName);
      }else{
        return Model.queues;
      }
    };
    this.query=function(listId){
      if(listId){
        return findById(listId);
      }else{
        return Model.queues;
      }
    };
    this.remove=function(queue){
      _.remove(Model.queues,function(list){
          return list.id===queue.id;
      });
      saveModel();
    }

    var Model=loadModel();
    //$interval(this.recalculateWaitTime,5000);
    //$interval(this.clearWindows,15000);
  });
