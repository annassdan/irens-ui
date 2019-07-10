import { TestBed } from '@angular/core/testing';

import { PembelianService } from './pembelian.service';

describe('PembelianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PembelianService = TestBed.get(PembelianService);
    expect(service).toBeTruthy();
  });
});
