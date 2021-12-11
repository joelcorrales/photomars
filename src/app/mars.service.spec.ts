import { TestBed } from '@angular/core/testing';

import { MarsService } from './mars.service';

describe('MarsService', () => {
  let service: MarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
