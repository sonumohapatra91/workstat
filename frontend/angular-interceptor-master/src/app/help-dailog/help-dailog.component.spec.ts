import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDailogComponent } from './help-dailog.component';

describe('HelpDailogComponent', () => {
  let component: HelpDailogComponent;
  let fixture: ComponentFixture<HelpDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
