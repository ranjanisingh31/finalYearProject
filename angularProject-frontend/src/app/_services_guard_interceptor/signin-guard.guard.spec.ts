import { TestBed } from '@angular/core/testing';

import { SigninGuardGuard } from './signin-guard.guard';

describe('SigninGuardGuard', () => {
  let guard: SigninGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SigninGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
