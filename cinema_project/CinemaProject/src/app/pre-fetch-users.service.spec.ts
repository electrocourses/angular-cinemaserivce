import { TestBed } from '@angular/core/testing';

import { PreFetchUsersService } from './pre-fetch-users.service';

describe('PreFetchUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreFetchUsersService = TestBed.get(PreFetchUsersService);
    expect(service).toBeTruthy();
  });
});
