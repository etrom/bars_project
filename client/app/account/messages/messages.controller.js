'use strict';

angular.module('barsApp')
  .controller('MessagesCtrl', function ($scope, User, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.userId = Auth.getCurrentUser()._id;
    $scope.partnerId = Auth.getCurrentUser().reqFrom
    $scope.partner = {}
    // console.log(Auth.getCurrentUser())

    User.get().$promise.then(function(user) {
        console.log("this is runng", user);
        $http.get('api/users/'+ user.reqFrom).success(function(partner) {
            console.log('partner',partner)
            $scope.partner = partner;
        })
    })
    //http request to a route that find by id and sends back the user to inject user name
    // $scope.partner = function(){

    //     $http.get().success(function(data, status, headers, config) {
    //         console.log(data);
    //         $scope.partnerName = data.name;
    //       }).
    //       error(function(data, status, headers, config) {
    //         // called asynchronously if an error occurs
    //         // or server returns response with an error status.
    //       });
    // }()

    //on accept
    $scope.addPartner = function() {
    $http.post('api/users/'+ $scope.userId +'/partnered/'+$scope.partnerId).
          success(function(data, status, headers, config) {
            console.log(data);
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
