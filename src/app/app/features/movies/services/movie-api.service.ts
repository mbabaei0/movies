import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MovieSearchParams } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  #http = inject(HttpClient);


  fetchMovies(params: MovieSearchParams){
    return this.#http.get<any>('', {params: {...params, s: params.term}})
  }
}
