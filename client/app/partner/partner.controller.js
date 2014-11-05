'use strict';
//scope is a box
//as long as you remember where you put different stuff (the correct name)
//you can retrieve it
//vending machine - you have to type the key in to get the value
angular.module('barsApp')
  .controller('PartnerCtrl', function ($scope, $http, socket, Auth) {
        $scope.partner =[];
        $scope.userId = Auth.getCurrentUser()._id;
        $scope.message = '';

        $http.get('/api/partner/').success(function(partner) {
          $scope.partner = partner;
          socket.syncUpdates('Partner', $scope.partner);
        });

        $scope.addPartner = function(email) {
          $scope.partnerEmail = email;
          if($scope.partner === ''){
                return;
            }
          $http.post('/api/partner/submit', {email: $scope.partnerEmail, userId: $scope.userId}).
          success(function(data, status, headers, config) {
            console.log(data, "data");
            if(data[0]) {
              $scope.message = "request sent";

              $http.get('/api/users/' + data[0]._id+ '/pair/'+ $scope.userId);
            } else {
              console.log(data);
              $scope.message = data.message;
            }

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
        //   $http.post('/api/partner/submit', { email: $scope.newPartner, userId: $scope.userId });
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