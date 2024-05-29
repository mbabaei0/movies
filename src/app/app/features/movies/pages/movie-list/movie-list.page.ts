import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { MovieFacadeService } from '../../services/movie-facade.service';

import { Movie, MovieSearchParams, MovieSummary } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@shared/components/search/search.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GroupByService } from '@core/services/group-by.service';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
     CommonModule,
     SearchComponent,
     MovieCardComponent,
     MatSelectModule,
     FormsModule,
     MatButton,
     MatDividerModule,
     MatChipsModule
  ],
  templateUrl: './movie-list.page.html',
  styleUrl: './movie-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPage {
  destroyRef = inject(DestroyRef);
  movieFacade = inject(MovieFacadeService);

  searchParam = signal<MovieSearchParams>({page:1, term:'', type:'movie'});
  movieTypes: MovieSearchParams['type'][] = ['movie', 'series', 'episode'];


  onSearch(params: MovieSearchParams){
    if(!params.term) {
      this.movieFacade.resetStore();
      return
    }
    this.movieFacade.fetachMovies(params)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
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
