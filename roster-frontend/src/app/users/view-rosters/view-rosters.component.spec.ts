import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRostersComponent } from './view-rosters.component';

describe('ViewRostersComponent', () => {
  let component: ViewRostersComponent;
  let fixture: ComponentFixture<ViewRostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
