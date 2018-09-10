import { TestBed, inject } from '@angular/core/testing';

import { ViewRosterRouteGaurdService } from './view-roster-route-gaurd.service';

describe('ViewRosterRouteGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewRosterRouteGaurdService]
    });
  });

  it('should be created', inject([ViewRosterRouteGaurdService], (service: ViewRosterRouteGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
