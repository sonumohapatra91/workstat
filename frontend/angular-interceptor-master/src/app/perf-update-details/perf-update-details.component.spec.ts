import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfUpdateDetailsComponent } from './perf-update-details.component';

describe('PerfUpdateDetailsComponent', () => {
  let component: PerfUpdateDetailsComponent;
  let fixture: ComponentFixture<PerfUpdateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfUpdateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
