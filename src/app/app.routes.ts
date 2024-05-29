import { Routes } from '@angular/router';
import { MOVIES_ROUTES } from './app/features/movies/movies.routes';

export const routes: Routes = [
  {path:'movies',
    children:[
      ...MOVIES_ROUTES
    ]
  },
  {path:'', redirectTo:'movies', pathMatch:'full'}
];
