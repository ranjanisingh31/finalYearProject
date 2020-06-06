import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectedVehicleDialogComponent } from './admin-selected-vehicle-dialog.component';

describe('AdminSelectedVehicleDialogComponent', () => {
  let component: AdminSelectedVehicleDialogComponent;
  let fixture: ComponentFixture<AdminSelectedVehicleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSelectedVehicleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectedVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
