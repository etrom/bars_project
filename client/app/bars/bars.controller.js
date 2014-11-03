'use strict';

angular.module('barsApp')
    .controller('BarCtrl', function ($scope, $http, socket) {
        $scope.bars = [];

        $http.get('/api/bars').success(function(bars) {
          $scope.bars = bars;
          socket.syncUpdates('bar', $scope.Bars);
        });

        $scope.addBar = function() {
          if($scope.newBar === '') {
            return;
          }
          $http.post('/api/bars', { name: $scope.newBar });
          $scope.newBar = '';
        };

        $scope.deleteBar = function(bar) {
          $http.delete('/api/bars/' + bar._id);
        };

        $scope.$on('$destroy', function () {
          socket.unsyncUpdates('bar');
        });

    });