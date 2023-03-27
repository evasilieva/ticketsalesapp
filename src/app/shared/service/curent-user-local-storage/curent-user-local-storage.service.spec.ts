import {TestBed} from '@angular/core/testing';

import {CurrentUserLocalStorageService} from './current-user-local-storage.service';

describe('CurentUserLocalStorageService', () => {
  let service: CurrentUserLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
