import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyAdminUsersGuard } from './only-admin-users.guard';

describe('OnlyAdminUsersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyAdminUsersGuard]
    });
  });

  it('should ...', inject([OnlyAdminUsersGuard], (guard: OnlyAdminUsersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
