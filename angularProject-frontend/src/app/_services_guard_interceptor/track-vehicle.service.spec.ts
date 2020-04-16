import { TestBed } from '@angular/core/testing';

import { TrackVehicleService } from './track-vehicle.service';

describe('TrackVehicleService', () => {
  let service: TrackVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
