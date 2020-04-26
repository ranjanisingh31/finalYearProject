import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurDriveConfirmDialogComponent } from './chauffeur-drive-confirm-dialog.component';

describe('ChauffeurDriveConfirmDialogComponent', () => {
  let component: ChauffeurDriveConfirmDialogComponent;
  let fixture: ComponentFixture<ChauffeurDriveConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurDriveConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurDriveConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
