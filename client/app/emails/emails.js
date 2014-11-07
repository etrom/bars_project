'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('emails', {
        url: '/emails',
        templateUrl: 'app/emails/emails.html',
        controller: 'EmailsCtrl'
      });
  });