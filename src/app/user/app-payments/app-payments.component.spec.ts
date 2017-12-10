import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaymentsComponent } from './app-payments.component';

describe('AppPaymentsComponent', () => {
  let component: AppPaymentsComponent;
  let fixture: ComponentFixture<AppPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
