import { Routes } from '@angular/router';
import { MOVIES_ROUTES } from './app/features/movies/movies.routes';

export const routes: Routes = [
  {path:'movies',
  loadChildren: () =>
    import('./app/features/movies/movies.routes')
        .then(m => m.MOVIES_ROUTES)
  },
  {path:'', redirectTo:'movies', pathMatch:'full'}
];
