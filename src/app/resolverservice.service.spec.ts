import { TestBed } from '@angular/core/testing';

import { ResolverserviceService } from './resolverservice.service';

describe('ResolverserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolverserviceService = TestBed.get(ResolverserviceService);
    expect(service).toBeTruthy();
  });
});
