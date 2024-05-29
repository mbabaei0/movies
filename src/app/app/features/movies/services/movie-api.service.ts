import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie, MovieSearchParams } from '../models/movies.model';
import { ApiResponse } from '@core/models/api-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  #http = inject(HttpClient);

  fetchMovies(params: MovieSearchParams){
    return this.#http.get<ApiResponse<Movie[]>>('', {params: {...params, s: params.term}})
  }

  fetchMovie(id:string){
    return this.#http.get<Movie>('', {params: {i:id}})
  }
}
