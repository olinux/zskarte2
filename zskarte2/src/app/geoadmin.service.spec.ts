import { TestBed } from '@angular/core/testing';

import { GeoadminService } from './geoadmin.service';

describe('GeoadminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoadminService = TestBed.get(GeoadminService);
    expect(service).toBeTruthy();
  });
});
