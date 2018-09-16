import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRostersComponent } from './new-rosters.component';

describe('NewRostersComponent', () => {
  let component: NewRostersComponent;
  let fixture: ComponentFixture<NewRostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
