import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppsComponent } from './apps/apps.component';
import { AppPaymentsComponent } from './app-payments/app-payments.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'my-apps', component: AppsComponent },
      { path: 'app-payments/:appId', component: AppPaymentsComponent },
    ]
  }
];

export const UserRouter: ModuleWithProviders = RouterModule.forChild(routes);
