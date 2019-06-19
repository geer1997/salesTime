import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGreetingComponent } from './home-greeting.component';

describe('HomeGreetingComponent', () => {
  let component: HomeGreetingComponent;
  let fixture: ComponentFixture<HomeGreetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGreetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
