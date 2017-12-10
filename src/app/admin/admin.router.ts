import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AppsComponent } from './apps/apps.component';
import { UserAppsComponent } from './user-apps/user-apps.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/apps/:userId', component: UserAppsComponent },
      { path: 'apps', component: AppsComponent }
    ]
  }
];

// export const AdminRouter: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AdminRouter {}
