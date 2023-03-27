import {TestBed} from '@angular/core/testing';

import {UsersLocalStorageService} from './users-local-storage.service';

describe('UsersLocalStorageService', () => {
  let service: UsersLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
