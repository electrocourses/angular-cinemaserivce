import { TestBed } from '@angular/core/testing';

import { PreFetchCinemaHallsService } from './pre-fetch-cinema-halls.service';

describe('PreFetchCinemaHallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreFetchCinemaHallsService = TestBed.get(PreFetchCinemaHallsService);
    expect(service).toBeTruthy();
  });
});
