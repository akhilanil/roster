import { TestBed, inject } from '@angular/core/testing';

import { RosterListCacheService } from './roster-list-cache.service';

describe('RosterListCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RosterListCacheService]
    });
  });

  it('should be created', inject([RosterListCacheService], (service: RosterListCacheService) => {
    expect(service).toBeTruthy();
  }));
});
