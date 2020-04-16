import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurDriveComponent } from './chauffeur-drive.component';

describe('ChauffeurDriveComponent', () => {
  let component: ChauffeurDriveComponent;
  let fixture: ComponentFixture<ChauffeurDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
