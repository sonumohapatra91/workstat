import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfAddDetailsComponent } from './perf-add-details.component';

describe('PerfAddDetailsComponent', () => {
  let component: PerfAddDetailsComponent;
  let fixture: ComponentFixture<PerfAddDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfAddDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfAddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
