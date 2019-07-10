import { TestBed } from '@angular/core/testing';

import { PengeluaranService } from './pengeluaran.service';

describe('PengeluaranService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PengeluaranService = TestBed.get(PengeluaranService);
    expect(service).toBeTruthy();
  });
});
