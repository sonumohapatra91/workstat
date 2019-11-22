import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDailogComponent } from './alert-dailog.component';

describe('AlertDailogComponent', () => {
  let component: AlertDailogComponent;
  let fixture: ComponentFixture<AlertDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
