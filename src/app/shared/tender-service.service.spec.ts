import { TestBed } from '@angular/core/testing';

import { TenderServiceService } from './tender-service.service';

describe('TenderServiceService', () => {
  let service: TenderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
