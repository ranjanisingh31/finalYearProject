import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseVehicleComponent } from './lease-vehicle.component';

describe('LeaseVehicleComponent', () => {
  let component: LeaseVehicleComponent;
  let fixture: ComponentFixture<LeaseVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
