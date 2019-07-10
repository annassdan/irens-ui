import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBuyerComponent } from './master-buyer.component';

describe('MasterBuyerComponent', () => {
  let component: MasterBuyerComponent;
  let fixture: ComponentFixture<MasterBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
