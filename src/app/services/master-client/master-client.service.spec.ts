import { TestBed } from '@angular/core/testing';

import { MasterClientService } from './master-client.service';

describe('MasterClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterClientService = TestBed.get(MasterClientService);
    expect(service).toBeTruthy();
  });
});
