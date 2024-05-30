import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'movies',
  loadChildren: () =>
    import('./app/features/movies/movies.routes')
        .then(m => m.MOVIES_ROUTES)
  },
  {path:'', redirectTo:'movies', pathMatch:'full'}
];
