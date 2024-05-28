import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MovieFacadeService } from '../services/movie-facade.service';

import { Movie, MovieSearchParams } from '../models/movies.model';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@shared/components/search/search.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
     CommonModule,
     SearchComponent,
     MatSelectModule
    ],
  templateUrl: './movie-list.page.html',
  styleUrl: './movie-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPage {
  #movieFacade = inject(MovieFacadeService);

  searchParam = signal<MovieSearchParams>({page:1, term:'', type:'movie'})
  movieTypes: MovieSearchParams['type'][] = ['movie','episode' , 'series']

  constructor(){
    effect(() => {
      this.onSearch(this.searchParam())
    });
  }

  onSearch(params: MovieSearchParams){
    this.#movieFacade.getMovies(params).subscribe();
  }
  onSearchChanged(term:string){
    this.searchParam.update( params => ({...params,  term}))
  }
  onTypeChanged(event: MatSelectChange){
    this.searchParam.update( params => ({...params,  type: event.value}))
  }
}
