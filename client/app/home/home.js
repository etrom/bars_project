'use strict';
//displays when logged in
angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
            "": {templateUrl: 'app/home/home.html',
                 controller: 'HomeCtrl',
},

            'bars@home' : {
                controller: 'BarCtrl',
                templateUrl: 'app/bars/bars.html'
            }
        }
      })
    //   .state('main.bars', {
    //     url: '/bars',
    //     template: 'I could sure use a drink right now.'
    // })

  });