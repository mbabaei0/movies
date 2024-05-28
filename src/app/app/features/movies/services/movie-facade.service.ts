import { Injectable, inject } from '@angular/core';
import { MovieApiService } from './movie-api.service';
import { MovieSearchParams } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieFacadeService {
  #movieApiService = inject(MovieApiService);

  getMovies(params: MovieSearchParams){
    return this.#movieApiService.fetchMovies(params);
  }
  getMovie(id: string){
    return this.#movieApiService.fetchMovie(id);
  }
}
