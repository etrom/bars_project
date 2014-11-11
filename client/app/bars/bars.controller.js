'use strict';

///how to talk to bar.controller(the api)

angular.module('barsApp')
    .controller('BarCtrl', function ($scope, $http, socket, Auth) {
        $scope.bars = [];
        $scope.user = Auth.getCurrentUser();
        $scope.hasReminded = false;

        // onBarChange(function() {
        //   if (bar.fulfillment <= 45 && !$scope.hasReminded) {
        //     $scope.hasReminded = true;
        //     // email
        //   }
        //   // handle other changes
        // })

        $http.get('/api/bars/' + $scope.user._id).success(function(barsFromGet) {
          $scope.bars = barsFromGet;

          socket.syncUpdates('bar', barsFromGet, function(event, oneBar, barsFromSocket) {
            var filteredBars = barsFromSocket.filter(function(bar) {
              if (bar.userId === $scope.user._id) {
                return true;
              }
            });
            angular.copy(filteredBars, $scope.bars);
            $scope.lowBarReminder($scope.bars);

          });


        });
        // if bar gets low send email
        $scope.lowBarReminder = function(bars){
          if($scope.user.partner) {
            for(var i = 0; i < bars.length; i++) {
              if (bars[i].fulfillment <= 45 && bars[i].reminded === false){
                bars[i].reminded = true;

                console.log('bar is low');
                console.log(bars[0], 'bars[i]')

                //url that partner will click to submit updates
                //bar userId, bar name, barId
                $scope.uniqueUrl = '/messages/'+ bars[i].userId + '/' + bars[i].name + '/' + bars[i]._id;
                //get the user based on the bar
                $scope.barName = bars[i].name;
                $scope.barId = bars[i]._id

                $http.get('/api/users/'+ bars[i].userId, {barName: bars[i].name}).success(function(user){
                  // post with this data
                  console.log('inside api/users')
                  $http.post('/api/emails/lowBar', {id: user._id, barId: $scope.barId, barName: $scope.barName, name: user.name, url: $scope.uniqueUrl, reminded: true }).success(function(bar){
                    console.log('inside lowbar call ')
                    $http.put('/api/bars/'+ $scope.barId, {reminded: true}).success(function(bar){
                      $scope.bars[i] = bar;
                      console.log(bars[i], 'reminded true');
                    }).error(function(data, status, headers, config) {
                      console.log("inside error from api/bars/barid", data, status);
                    });
                  }).error(function(data, status, headers, config) {
                    console.log("inside erro from api/emails/lowbar", data, status);
                  });
                })
              }
            }
          }
        };


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