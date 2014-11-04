'use strict';

angular.module('barsApp')
  .controller('HomeCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
  });
///inject auth to see if people are logged in