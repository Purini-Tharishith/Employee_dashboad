import { TestBed } from '@angular/core/testing';

import { MasterInterceptor } from './master.interceptor';

describe('MasterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MasterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MasterInterceptor = TestBed.inject(MasterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
