import { TestBed, inject } from '@angular/core/testing';

import { ResetPasswordGaurdService } from './reset-password-gaurd.service';

describe('ResetPasswordGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetPasswordGaurdService]
    });
  });

  it('should be created', inject([ResetPasswordGaurdService], (service: ResetPasswordGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
