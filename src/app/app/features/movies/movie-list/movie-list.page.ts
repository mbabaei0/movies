import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MovieFacadeService } from '../services/movie-facade.service';

import { Movie, MovieSearchParams } from '../models/movies.model';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@shared/components/search/search.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GroupByService } from '@core/services/group-by.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
     CommonModule,
     SearchComponent,
     MatSelectModule,
     FormsModule
    ],
  templateUrl: './movie-list.page.html',
  styleUrl: './movie-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPage {
  #movieFacade = inject(MovieFacadeService);
  #groupByService = inject(GroupByService);

  searchParam = signal<MovieSearchParams>({page:1, term:'', type:'movie'});
  movieTypes: MovieSearchParams['type'][] = ['movie','episode' , 'series'];


  movies = signal<Map<string,Movie[]> | null | undefined>(undefined);
  errMessage = signal<string | null>(null);

  constructor(){
    effect(() => {
      this.onSearch(this.searchParam())
    });
  }

  onSearch(params: MovieSearchParams){
    this.#movieFacade.getMovies(params).subscribe(async (res)=>{
      if(res.Error) {
        this.errMessage.set(res.Error);
        this.movies.set(undefined)
      }
      else if(res.Search) {
        const grouped = await this.#groupByService.groupBy(res.Search , 'Year')
        console.log(grouped)
        this.movies.set(grouped)
        this.errMessage.set(null)
      }
    });
  }
  onSearchChanged(term:string){
    this.searchParam.update( params => ({...params,  term}))
  }
  onTypeChanged(event: MatSelectChange){
    this.searchParam.update( params => ({...params,  type: event.value}))
  }
}
