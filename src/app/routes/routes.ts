import { Routes, RouterModule} from '@angular/router';

import { AuthGuard } from 'app/shared/services/auth-guard.service';

import { HomeComponent } from 'app/routes/home/home.component';
import { DashboardComponent } from 'app/routes/dashboard/dashboard.component';
import { LoginComponent } from 'app/routes/login/login.component';
import { RedirectComponent } from 'app/routes/redirect/redirect.component';
import { PageNotFoundComponent } from 'app/routes/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'logout',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'go/:id',
    component: RedirectComponent
  },
  {
    path: 'go',
    redirectTo: '/',
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent
]