'use strict';

angular.module('barsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        views: {
            "": {templateUrl: 'app/main/main.html',
                 controller: 'MainCtrl',
},

            'bars@main' : {
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