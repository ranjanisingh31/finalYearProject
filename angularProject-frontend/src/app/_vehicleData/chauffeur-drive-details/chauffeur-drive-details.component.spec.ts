import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurDriveDetailsComponent } from './chauffeur-drive-details.component';

describe('ChauffeurDriveDetailsComponent', () => {
  let component: ChauffeurDriveDetailsComponent;
  let fixture: ComponentFixture<ChauffeurDriveDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurDriveDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurDriveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
