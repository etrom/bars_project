'use strict';

///how to talk to bar.controller(the api)

angular.module('barsApp')
    .controller('BarCtrl', function ($scope, $http, socket, Auth) {
        $scope.bars = [];
        $scope.userId = Auth.getCurrentUser()._id;
        console.log($scope);

        $http.get('/api/bars/' + $scope.userId).success(function(bars) {
          $scope.bars = bars;
          socket.syncUpdates('bar', $scope.bars);
        });

        $scope.addBar = function() {
          if($scope.newBar === '') {
            return;
          }
          $http.post('/api/bars', { name: $scope.newBar, userId: $scope.userId });
          $scope.newBar = '';
        };

        $scope.deleteBar = function(bar) {
          $http.delete('/api/bars/' + bar._id);
        };

        $scope.$on('$destroy', function () {
          socket.unsyncUpdates('bar');
        });

    });