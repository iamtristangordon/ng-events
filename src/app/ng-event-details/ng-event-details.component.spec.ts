import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgEventDetailsComponent } from './ng-event-details.component';

describe('NgEventDetailsComponent', () => {
  let component: NgEventDetailsComponent;
  let fixture: ComponentFixture<NgEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
