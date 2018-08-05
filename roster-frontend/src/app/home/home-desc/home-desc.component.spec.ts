import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDescComponent } from './home-desc.component';

describe('HomeDescComponent', () => {
  let component: HomeDescComponent;
  let fixture: ComponentFixture<HomeDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
