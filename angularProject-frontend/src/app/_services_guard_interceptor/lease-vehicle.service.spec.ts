import { TestBed } from '@angular/core/testing';

import { LeaseVehicleService } from './lease-vehicle.service';

describe('LeaseVehicleService', () => {
  let service: LeaseVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
