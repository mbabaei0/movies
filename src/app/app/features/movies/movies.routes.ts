import { Routes } from '@angular/router';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/movie-list/movie-list.page')
      .then(c => c.MovieListPage)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/movie-detail/movie-detail.page')
      .then(c => c.MovieDetailPage)
  },
];
