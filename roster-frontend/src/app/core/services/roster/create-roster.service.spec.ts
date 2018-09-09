import { TestBed, inject } from '@angular/core/testing';

import { CreateRosterService } from './create-roster.service';

describe('CreateRosterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateRosterService]
    });
  });

  it('should be created', inject([CreateRosterService], (service: CreateRosterService) => {
    expect(service).toBeTruthy();
  }));
});
