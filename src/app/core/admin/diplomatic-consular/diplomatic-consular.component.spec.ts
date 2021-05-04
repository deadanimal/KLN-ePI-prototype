import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaticConsularComponent } from './diplomatic-consular.component';

describe('DiplomaticConsularComponent', () => {
  let component: DiplomaticConsularComponent;
  let fixture: ComponentFixture<DiplomaticConsularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaticConsularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaticConsularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
