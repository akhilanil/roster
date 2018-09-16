import { TestBed, inject } from '@angular/core/testing';

import { LoginRouteService } from './login-route.service';

describe('LoginRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRouteService]
    });
  });

  it('should be created', inject([LoginRouteService], (service: LoginRouteService) => {
    expect(service).toBeTruthy();
  }));
});
