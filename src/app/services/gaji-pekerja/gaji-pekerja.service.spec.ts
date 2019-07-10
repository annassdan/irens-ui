import { TestBed } from '@angular/core/testing';

import { GajiPekerjaService } from './gaji-pekerja.service';

describe('GajiPekerjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GajiPekerjaService = TestBed.get(GajiPekerjaService);
    expect(service).toBeTruthy();
  });
});
