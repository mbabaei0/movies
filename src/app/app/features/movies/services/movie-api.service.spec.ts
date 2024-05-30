import { TestBed } from '@angular/core/testing';

import { MovieApiService } from './movie-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieApiService', () => {
  let service: MovieApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
