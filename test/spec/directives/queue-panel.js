'use strict';

describe('Directive: queuePanel', function () {

  // load the directive's module
  beforeEach(module('waitTimeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<queue-panel></queue-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the queuePanel directive');
  }));
});
