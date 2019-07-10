import { TestBed } from '@angular/core/testing';

import { MasterPekerjaService } from './master-pekerja.service';

describe('MasterPekerjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterPekerjaService = TestBed.get(MasterPekerjaService);
    expect(service).toBeTruthy();
  });
});
