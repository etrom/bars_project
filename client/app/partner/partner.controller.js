'use strict';
//scope is a box
//as long as you remember where you put different stuff (the correct name)
//you can retrieve it
//vending machine - you have to type the key in to get the value
angular.module('barsApp')
  .controller('PartnerCtrl', function ($scope, $http, socket, Auth) {
      $scope.partner =[];
      $scope.userId = Auth.getCurrentUser();
      $scope.message = '';
      $scope.hasPartner = false;
      $scope.partnerBars = [];


      $http.get('/api/partner/').success(function(partner) {
        $scope.partner = partner;
        socket.syncUpdates('Partner', $scope.partner);
      });
        //check if partner exists
        $scope.checkHasPartner = function() {

          $scope.userId.$promise.then(function(user) {
            $http.get('api/users/'+ user._id).
            success(function(data, status, headers, config) {
              if (data.partner) {

                  $scope.hasPartner = true;
                  //if partner exists get their bars
                  $http.get('/api/bars/' + data.partner).success(function(bars) {
                    $scope.partnerBars = bars;
                    socket.syncUpdates('partnerBars', $scope.partnerBars);
                  });
                } else {
                  $scope.hasPartner = false;
                }

            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
          })


      }
      $scope.checkHasPartner();

      $scope.addPartner = function(email) {
        $scope.partnerEmail = email;
        if($scope.partner === ''){
              return;
          }
        $http.post('/api/partner/submit', {email: $scope.partnerEmail, userId: $scope.userId._id}).
        success(function(data, status, headers, config) {
          console.log(data, "data");
          if(data[0]) {
            $scope.message = "request sent";
            $http.get('/api/users/' + data[0]._id+ '/pair/'+ $scope.userId._id);
          } else {
            console.log(data);
            $scope.message = data.message;
          }
          $scope.partnerEmail = '';
          socket.syncUpdates('message', $scope.message);

        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

          $scope.partner = '';
      }

      $scope.newPartner = function() {
          console.log($scope.partner);
          if($scope.partner === ''){
              return;
          }
          $scope.partner = '';

        return $scope.partner;
      };



      // $scope.addPartner = function() {
      //   if($scope.newPartner === '') {
      //     return;
      //   }
      //   $http.post('/api/partner/submit', { email: $scope.newPartner, userId: $scope.userId._id });
      //   $scope.newPartner = '';
      // };
      // $scope.addPartner = function() {
      //   if($scope.newPartner === '') {
      //     return;
      //   }
      //   $http.post('/api/partner', { name: $scope.newPartner, userId: $scope.userId });
      //   $scope.newPartner = '';
      // };



      $scope.deletePartner = function(Partner) {
        $http.delete('/api/partner/' + partner._id);
      };

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('partner');
      });

    });