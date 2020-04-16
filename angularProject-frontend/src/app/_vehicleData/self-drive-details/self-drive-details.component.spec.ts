import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDriveDetailsComponent } from './self-drive-details.component';

describe('SelfDriveDetailsComponent', () => {
  let component: SelfDriveDetailsComponent;
  let fixture: ComponentFixture<SelfDriveDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfDriveDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDriveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
