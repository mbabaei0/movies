import { Injectable, signal } from '@angular/core';
import { MovieSummary } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieStateService {

  readonly #state = {
    $movies : signal<Map<string,MovieSummary[]> | null | undefined>(undefined),
    $errMessage : signal<string | null>(null),
    $totalPages : signal<number>(0),
    $loading : signal<boolean>(false),
  } as const;


  public readonly $movies = this.#state.$movies.asReadonly();
  public readonly $errMessage = this.#state.$errMessage.asReadonly();
  public readonly $totalPages = this.#state.$totalPages.asReadonly();
  public readonly $loading = this.#state.$loading.asReadonly();

  setMovies(movies: Map<string,MovieSummary[]> | null) {
    this.#state.$movies.set(movies);
  }
  setErr(err:string) {
    this.#state.$errMessage.set(err);
  }
  setTotalPages(total: number) {
    this.#state.$totalPages.set(total);
  }
  setSetLoading(loading: boolean) {
    this.#state.$loading.set(loading);
  }
}
