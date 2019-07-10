import { TestBed } from '@angular/core/testing';

import { MasterBankService } from './master-bank.service';

describe('MasterBankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterBankService = TestBed.get(MasterBankService);
    expect(service).toBeTruthy();
  });
});
