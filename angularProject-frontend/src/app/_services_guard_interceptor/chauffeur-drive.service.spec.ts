import { TestBed } from '@angular/core/testing';

import { ChauffeurDriveService } from './chauffeur-drive.service';

describe('ChauffeurDriveService', () => {
  let service: ChauffeurDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChauffeurDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
