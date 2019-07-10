import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBankComponent } from './master-bank.component';

describe('MasterBankComponent', () => {
  let component: MasterBankComponent;
  let fixture: ComponentFixture<MasterBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
