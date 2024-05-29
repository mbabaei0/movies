import { Component, OnInit, inject, ChangeDetectionStrategy, signal} from '@angular/core';
import { MovieFacadeService } from '../../services/movie-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movies.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDivider,
    MatProgressSpinnerModule
  ],
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
