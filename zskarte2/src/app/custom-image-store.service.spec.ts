import {TestBed} from '@angular/core/testing';

import {CustomImageStoreService} from './custom-image-store.service';

describe('CustomImageStoreService', () => {
  let service: CustomImageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomImageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
