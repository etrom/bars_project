'use strict';

angular.module('barsApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        },
        // interceptor: {
        //   response: function(response) {
        //     // expose response
        //     return response;
        //   }
        // }
      }
	  })
  });

// var Resource = $resource('/url', {}, {
//   get: {
//     method: 'get',
//     interceptor: {
//       response: function(response) {
//         // expose response
//         return response;
//       }
//     }
//   }
// });