import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdVisaComponent } from './id-visa.component';

describe('IdVisaComponent', () => {
  let component: IdVisaComponent;
  let fixture: ComponentFixture<IdVisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdVisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
