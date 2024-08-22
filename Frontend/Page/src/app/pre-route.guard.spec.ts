import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preRouteGuard } from './pre-route.guard';

describe('preRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
