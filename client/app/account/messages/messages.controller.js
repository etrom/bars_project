'use strict';

angular.module('barsApp')
  .controller('MessagesCtrl', function ($scope, User, $http, Auth, $window) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.userId = Auth.getCurrentUser();
    $scope.partnerId = Auth.getCurrentUser().reqFrom;
    $scope.partner = {};
    $scope.acceptance = {};
    // console.log(Auth.getCurrentUser())

    User.get().$promise.then(function(user) {
        $http.get('api/users/'+ user.reqFrom).success(function(partner) {
            $scope.partner = partner;
        })
    })


    //on accept
    $scope.addPartner = function(acceptance) {
        $scope.acceptance = acceptance;
    $http.post('api/users/'+ $scope.userId._id +'/confirmPartner/'+$scope.partnerId, {acceptance: $scope.acceptance}).
          success(function(data, status, headers, config) {
            $window.location.href = '/home';
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    //save this info to the model
        // {partner: $scope.currentUser.reqFrom}
    }




    // console.log($scope.getCurrentUser().name);
    // $scope.changePassword = function(form) {
    //   $scope.submitted = true;
    //   if(form.$valid) {
    //     Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
    //     .then( function() {
    //       $scope.message = 'Password successfully changed.';
    //     })
    //     .catch( function() {
    //       form.password.$setValidity('mongoose', false);
    //       $scope.errors.other = 'Incorrect password';
    //       $scope.message = '';
    //     });
    //   }
    //     };
  });
