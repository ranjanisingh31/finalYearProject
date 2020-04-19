import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDriveConfirmDialogComponent } from './self-drive-confirm-dialog.component';

describe('SelfDriveConfirmDialogComponent', () => {
  let component: SelfDriveConfirmDialogComponent;
  let fixture: ComponentFixture<SelfDriveConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfDriveConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDriveConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
