'use strict';

///how to talk to bar.controller(the api)

angular.module('barsApp')
    .controller('BarCtrl', function ($scope, $http, socket, Auth) {
        $scope.bars = [];
        $scope.user = Auth.getCurrentUser();

        $http.get('/api/bars/' + $scope.user._id).success(function(barsFromGet) {
          $scope.bars = barsFromGet;

          socket.syncUpdates('bar', barsFromGet, function(event, oneBar, barsFromSocket) {
            var filteredBars = barsFromSocket.filter(function(bar) {
              if (bar.userId === $scope.user._id) {
                return true;
              }
            });
            console.log("i got here", filteredBars);
            angular.copy(filteredBars, $scope.bars);
            // $scope.bars = filteredBars;
            // $scope.lowBarReminder($scope.bars);
          });
        });

        //if bar gets low send email
        // $scope.lowBarReminder = function(bar){
        //   if (bar.fulfillment <= 45 && bar.name === 'Romance'){
        //     //url that partner will click to submit updates
        //     $scope.uniqueUrl = '/messages/'+ $scope.user._id + '/' + bar.name + '/' + bar._id;
        //     $http.post('/api/emails/lowBar', {name: $scope.user.name, url: $scope.uniqueUrl }).success(function(bar){
        //       console.log('wahoo');
        //     })
        //   }
        // };


        // increase fulfillment #'s
        $scope.addPercent = function(bar){
          $http.post('/api/bars/' + bar._id, { fulfillment: 10});
          console.log('added');
        }

        $scope.addBar = function() {
          if($scope.newBar === '') {
            return;
          }
          $http.post('/api/bars', { name: $scope.newBar, userId: $scope.userId._id });
          $scope.newBar = '';
        };

        $scope.deleteBar = function(bar) {
          $http.delete('/api/bars/' + bar._id);
        };

        $scope.$on('$destroy', function () {
          socket.unsyncUpdates('bar');
        });

    });