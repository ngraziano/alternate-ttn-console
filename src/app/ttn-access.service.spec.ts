import { TestBed } from '@angular/core/testing';

import { TtnAccessService } from './ttn-access.service';

describe('TtnAccessService', () => {
  let service: TtnAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtnAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
