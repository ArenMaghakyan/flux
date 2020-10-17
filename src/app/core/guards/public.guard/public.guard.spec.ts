import { inject, TestBed } from '@angular/core/testing';

import { PublicGuard } from '../auth.guard/auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicGuard],
    });
  });

  it('should ...', inject([PublicGuard], (guard: PublicGuard) => {
    expect(guard).toBeTruthy();
  }));
});
