import { TestBed } from '@angular/core/testing';

import { StatusClientService } from './status-client.service';

describe('StatusClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusClientService = TestBed.get(StatusClientService);
    expect(service).toBeTruthy();
  });
});
