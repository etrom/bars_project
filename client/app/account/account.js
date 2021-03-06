'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('partnerInvite', {
        url: '/signup/:signUpId',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('barsUpdate', {
        url: '/messages/:userId/:name/:id',
        templateUrl: 'app/account/messages/updateBars.html',
        controller: 'MessagesCtrl',
        authenticate: true
      })
      .state('messages', {
        url: '/messages',
        templateUrl: 'app/account/messages/messages.html',
        controller: 'MessagesCtrl',
        authenticate: true
      });

  });