import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDriveInfoDialogComponent } from './self-drive-info-dialog.component';

describe('SelfDriveInfoDialogComponent', () => {
  let component: SelfDriveInfoDialogComponent;
  let fixture: ComponentFixture<SelfDriveInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfDriveInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDriveInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
