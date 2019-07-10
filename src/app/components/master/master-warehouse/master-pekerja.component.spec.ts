import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPekerjaComponent } from './master-pekerja.component';

describe('MasterPekerjaComponent', () => {
  let component: MasterPekerjaComponent;
  let fixture: ComponentFixture<MasterPekerjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPekerjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPekerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
