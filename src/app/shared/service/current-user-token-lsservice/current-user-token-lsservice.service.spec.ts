import { TestBed } from '@angular/core/testing';

import { CurrentUserTokenLSServiceService } from './current-user-token-lsservice.service';

describe('CurrentUserTokenLSServiceService', () => {
  let service: CurrentUserTokenLSServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserTokenLSServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
