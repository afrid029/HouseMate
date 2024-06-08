import { TestBed } from '@angular/core/testing';

import { AlertSrvcService } from './alert-srvc.service';

describe('AlertSrvcService', () => {
  let service: AlertSrvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSrvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
