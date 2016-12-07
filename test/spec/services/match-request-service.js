'use strict';

describe('Service: MatchRequestService', function () {

  // load the service's module
  beforeEach(module('waitTimeApp'));

  // instantiate service
  var MatchRequestService;
  beforeEach(inject(function (_MatchRequestService_) {
    MatchRequestService = _MatchRequestService_;
  }));

  it('should do something', function () {
    expect(!!MatchRequestService).toBe(true);
  });

});
