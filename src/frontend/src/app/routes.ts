import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageIndexComponent } from './page-index/page-index.component';
import { PageSignInComponent } from './page-sign-in/page-sign-in.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageMyTasksComponent } from './page-my-tasks/page-my-tasks.component';

import { anonOnlyGuard, authOnlyGuard } from './routeGuards';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index',
  },
  {
    path: 'index',
    component: PageIndexComponent,
  },
  {
    path: 'signin',
    component: PageSignInComponent,
    canActivate: [anonOnlyGuard],
  },
  {
    path: 'register',
    component: PageRegisterComponent,
    canActivate: [anonOnlyGuard],
  },
  {
    path: 'tasks',
    component: PageMyTasksComponent,
    canActivate: [authOnlyGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
