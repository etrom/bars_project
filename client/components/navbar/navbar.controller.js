'use strict';

angular.module('barsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, socket) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.hasMessage = function(){
      if ($scope.getCurrentUser().requests === true){
        return true;
      }
      return false;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });