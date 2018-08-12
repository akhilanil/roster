import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterInputComponent } from './roster-input.component';

describe('RosterInputComponent', () => {
  let component: RosterInputComponent;
  let fixture: ComponentFixture<RosterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
