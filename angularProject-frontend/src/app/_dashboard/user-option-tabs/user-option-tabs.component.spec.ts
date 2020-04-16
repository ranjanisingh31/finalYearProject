import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOptionTabsComponent } from './user-option-tabs.component';

describe('UserOptionTabsComponent', () => {
  let component: UserOptionTabsComponent;
  let fixture: ComponentFixture<UserOptionTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOptionTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
