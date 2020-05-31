import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEditVehicleInfoDialogComponent } from './track-edit-vehicle-info-dialog.component';

describe('TrackEditVehicleInfoDialogComponent', () => {
  let component: TrackEditVehicleInfoDialogComponent;
  let fixture: ComponentFixture<TrackEditVehicleInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackEditVehicleInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEditVehicleInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
