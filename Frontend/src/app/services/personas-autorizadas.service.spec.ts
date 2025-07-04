import { TestBed } from '@angular/core/testing';

import { PersonasAutorizadasService } from './personas-autorizadas.service';

describe('PersonasAutorizadasService', () => {
  let service: PersonasAutorizadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasAutorizadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
