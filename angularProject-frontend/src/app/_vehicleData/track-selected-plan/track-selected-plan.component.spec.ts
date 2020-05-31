import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSelectedPlanComponent } from './track-selected-plan.component';

describe('TrackSelectedPlanComponent', () => {
  let component: TrackSelectedPlanComponent;
  let fixture: ComponentFixture<TrackSelectedPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackSelectedPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSelectedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
