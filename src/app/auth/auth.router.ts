import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: SignInComponent },
      // { path: 'sign-up', component: SignUpComponent }
    ]
  }
];

export const AuthRouter: ModuleWithProviders = RouterModule.forChild(routes);
