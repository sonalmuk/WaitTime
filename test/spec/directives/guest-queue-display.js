'use strict';

describe('Directive: guestQueueDisplay', function () {

  // load the directive's module
  beforeEach(module('waitTimeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<guest-queue-display></guest-queue-display>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the guestQueueDisplay directive');
  }));
});
