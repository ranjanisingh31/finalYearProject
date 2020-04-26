import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurDriveInfoDialogComponent } from './chauffeur-drive-info-dialog.component';

describe('ChauffeurDriveInfoDialogComponent', () => {
  let component: ChauffeurDriveInfoDialogComponent;
  let fixture: ComponentFixture<ChauffeurDriveInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurDriveInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurDriveInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
