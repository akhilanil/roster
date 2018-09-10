import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRosterComponent } from './display-roster.component';

describe('DisplayRosterComponent', () => {
  let component: DisplayRosterComponent;
  let fixture: ComponentFixture<DisplayRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
