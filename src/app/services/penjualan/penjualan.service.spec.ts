import { TestBed } from '@angular/core/testing';

import { PenjualanService } from './penjualan.service';

describe('PenjualanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PenjualanService = TestBed.get(PenjualanService);
    expect(service).toBeTruthy();
  });
});
