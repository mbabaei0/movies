import { Component, OnInit, inject, ChangeDetectionStrategy, signal} from '@angular/core';
import { MovieFacadeService } from '../../services/movie-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movies.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.page.html',
  styleUrl: './movie-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailPage implements OnInit {
  #movieFacade = inject(MovieFacadeService);
  #route = inject(ActivatedRoute);

  movie = signal<Movie | undefined>(undefined);

  ngOnInit(): void {
      this.#movieFacade.getMovie(this.#route.snapshot.paramMap.get('id')!).subscribe(res=> {
        this.movie.set(res)
      })
  }
}
