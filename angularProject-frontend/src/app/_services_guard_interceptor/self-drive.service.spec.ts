import { TestBed } from '@angular/core/testing';

import { SelfDriveService } from './self-drive.service';

describe('SelfDriveService', () => {
  let service: SelfDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
