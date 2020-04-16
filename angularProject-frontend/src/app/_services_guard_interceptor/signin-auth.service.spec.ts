import { TestBed } from '@angular/core/testing';

import { SigninAuthService } from './signin-auth.service';

describe('SigninAuthService', () => {
  let service: SigninAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
