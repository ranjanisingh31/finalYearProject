import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVehicleBookingDialogComponent } from './track-vehicle-booking-dialog.component';

describe('TrackVehicleBookingDialogComponent', () => {
  let component: TrackVehicleBookingDialogComponent;
  let fixture: ComponentFixture<TrackVehicleBookingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVehicleBookingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVehicleBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
