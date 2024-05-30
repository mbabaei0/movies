import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { MovieFacadeService } from '../../services/movie-facade.service';

import { Movie, MovieSearchParams, MovieSummary } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@shared/components/search/search.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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
     MatIconModule,
     MatProgressBarModule
  ],
  templateUrl: './movie-list.page.html',
  styleUrl: './movie-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListPage implements OnInit {
  destroyRef = inject(DestroyRef);
  movieFacade = inject(MovieFacadeService);

  searchParam = signal<MovieSearchParams>({page:1, term:'', type:'movie'});
  movieTypes: MovieSearchParams['type'][] = ['movie', 'series', 'episode'];

  ngOnInit(): void {
      this.movieFacade.resetStore();
  }
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
