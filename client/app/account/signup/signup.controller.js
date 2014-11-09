'use strict';

angular.module('barsApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, $stateParams, $http) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {

          Auth.getCurrentUser().$promise.then(function(data) {
            $scope.userId = data._id;
            $http.post('/api/users/' + $scope.userId + '/confirmPartner/' + $stateParams.signUpId, {acceptance: true})
            $location.path('/home');
          });

        })

        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      debugger;
      if ($stateParams.signUpId) {
        $window.location.href = '/auth/' + provider + '/' + $stateParams.signUpId;
      } else {
        $window.location.href = '/auth/' + provider;
      }
    };
  });
