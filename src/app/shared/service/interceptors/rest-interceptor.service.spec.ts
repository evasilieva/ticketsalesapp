import { TestBed } from '@angular/core/testing';

import { RestInterceptorService } from './rest-interceptor.service';

describe('RestInterceptorService', () => {
  let service: RestInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
