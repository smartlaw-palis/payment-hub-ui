import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users.guard';
import { OnlyAdminUsersGuard } from './guards/only-admin-users.guard';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    canActivate: [OnlyLoggedInUsersGuard],
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: 'admin',
    canActivate: [OnlyAdminUsersGuard],
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  { path: '**', redirectTo: '' }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(routes);
