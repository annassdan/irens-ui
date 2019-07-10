import { TestBed } from '@angular/core/testing';

import { MasterBarangService } from './master-barang.service';

describe('MasterBarangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterBarangService = TestBed.get(MasterBarangService);
    expect(service).toBeTruthy();
  });
});
