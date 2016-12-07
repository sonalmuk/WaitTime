'use strict';

/**
 * @ngdoc overview
 * @name waitTimeApp
 * @description
 * # waitTimeApp
 *
 * Main module of the application.
 */
angular
  .module('waitTimeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/provider/:name', {
        templateUrl: 'views/queues.html',
        controller: 'QueuectrlCtrl'
      })
      .when('/requester', {
        templateUrl: 'views/guests.html',
        controller: 'GuestCtrl'
      })
      .otherwise({
        templateUrl: 'views/queues.html',
        controller: 'QueuectrlCtrl'
      });
  });
