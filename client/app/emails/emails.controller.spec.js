'use strict';

describe('Controller: EmailsCtrl', function () {

  // load the controller's module
  beforeEach(module('barsApp'));

  var EmailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailsCtrl = $controller('EmailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
