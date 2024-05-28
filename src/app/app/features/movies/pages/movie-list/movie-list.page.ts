import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MovieFacadeService } from '../../services/movie-facade.service';

import { Movie, MovieSearchParams, MovieSummary } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@shared/components/search/search.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GroupByService } from '@core/services/group-by.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgOptimizedImage } from '@angular/common'
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
     CommonModule,
     SearchComponent,
     MatSelectModule,
     FormsModule,
     RouterLink,
     MatCardModule,
     MatButton,
     MatDividerModule,
     NgOptimizedImage
    ],
  templateUrl: './movie-list.page.html',
  styleUrl: './movie-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPage {
  #movieFacade = inject(MovieFacadeService);
  #groupByService = inject(GroupByService);

  searchParam = signal<MovieSearchParams>({page:1, term:'', type:'movie'});
  movieTypes: MovieSearchParams['type'][] = ['movie', 'series', 'episode'];


  movies = signal<Map<string,MovieSummary[]> | null | undefined>(undefined);
  errMessage = signal<string | null>(null);
  totalPages = signal<number>(0);

  constructor(){}

  onSearch(params: MovieSearchParams){
    if(!params.term) {
      this.errMessage.set(null);
      this.movies.set(null);
      return
    }

    this.#movieFacade.getMovies(params).subscribe(async (res)=>{
      if(res.Error) {
        this.errMessage.set(res.Error);
        this.movies.set(undefined);
      }
      else if(res.Search) {
        const grouped = await this.#groupByService.groupBy(res.Search , 'Year')
        this.movies.set(grouped);
        this.errMessage.set(null);
        this.totalPages.set( Math.ceil(+res.totalResults! / 10))
      }
    });
  }
  onSearchChanged(term:string){
    this.searchParam.update( params => ({...params,  term , page: 1}))
    this.onSearch(this.searchParam())
  }
  onTypeChanged(event: MatSelectChange){
    this.searchParam.update( params => ({...params,  type: event.value , page: 1}));
    this.onSearch(this.searchParam())
  }
  onNext(){
    this.searchParam.update(param => ({...param , page: param.page + 1}));
    this.onSearch(this.searchParam())
  }
  onPrev(){
    this.searchParam.update(param => ({...param , page: param.page - 1}));
    this.onSearch(this.searchParam())
  }
}
