import { TestBed } from '@angular/core/testing';

import { LlegueService } from './llegue.service';

describe('LlegueService', () => {
  let service: LlegueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlegueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
