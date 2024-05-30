import { Injectable, inject } from '@angular/core';
import { MovieApiService } from './movie-api.service';
import { MovieSearchParams } from '../models/movies.model';
import { MovieStateService } from '../state/movie-state.service';
import { debounceTime, finalize, tap } from 'rxjs';
import { GroupByService } from '@core/services/group-by.service';

@Injectable({
  providedIn: 'root'
})
export class MovieFacadeService {
  #movieApiService = inject(MovieApiService);
  #movieStateService = inject(MovieStateService);
  #groupByService = inject(GroupByService);

  get $movies(){
    return this.#movieStateService.$movies;
  }
  get $err(){
    return this.#movieStateService.$errMessage;
  }
  get $totalPages(){
    return this.#movieStateService.$totalPages;
  }

  get $loading(){
    return this.#movieStateService.$loading;
  }

  fetachMovies(params: MovieSearchParams){
    this.#movieStateService.setSetLoading(true);
    return this.#movieApiService.fetchMovies(params).pipe(
      debounceTime(200),
      tap(async(res) => {
        if(res.Error) {
          this.#movieStateService.setErr(res.Error);
          this.#movieStateService.setMovies(null);
          this.#movieStateService.setTotalPages(0)
        }
        else if(res.Search) {
          const grouped = await this.#groupByService.groupBy(res.Search , 'Year');
          this.#movieStateService.setMovies(grouped);
          this.#movieStateService.setErr('');
          this.#movieStateService.setTotalPages( Math.ceil(+res.totalResults! / 10))
        }
      }),
      finalize(() => {
        this.#movieStateService.setSetLoading(false);
      })
    );
  }

  resetStore(){
    this.#movieStateService.setErr('');
    this.#movieStateService.setMovies(null);
    this.#movieStateService.setTotalPages(0);
  }

  getMovie(id: string){
    return this.#movieApiService.fetchMovie(id);
  }
}
