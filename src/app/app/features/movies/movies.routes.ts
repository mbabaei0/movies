import { Routes } from '@angular/router';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./movie-list/movie-list.page')
      .then(mod => mod.MovieListPage)
  },
];
