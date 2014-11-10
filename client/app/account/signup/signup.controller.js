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
            $scope.currentUser = data;
            console.log(data, 'data')
            if ($stateParams) {
              $http.post('/api/users/' + $scope.currentUser._id + '/confirmPartner/' + $stateParams.signUpId, {acceptance: true});
            }
          })
          .then(function() {
            //create bars here
            var barArry = [{barName:'Romance', barInterval: 66}, {barName:'Social', barInterval: 1}, {barName:'Entertainment', barInterval: 7}, {barName:'Intimacy', barInterval: 14}, {barName:'Alone Time', barInterval: 14}];
            for (var i = 0; i < barArry.length; i++) {
              $http.post('/api/bars', { name: barArry[i].barName, userId: $scope.currentUser._id, depInterval: barArry[i].barInterval, fulfillment: 100 });
              console.log('posted');
            }
          })
          .then(function() {
            $location.path('/home');
          })
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
