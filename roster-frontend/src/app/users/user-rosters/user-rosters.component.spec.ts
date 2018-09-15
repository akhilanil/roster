import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRostersComponent } from './user-rosters.component';

describe('UserRostersComponent', () => {
  let component: UserRostersComponent;
  let fixture: ComponentFixture<UserRostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
