import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRouter } from './auth.router';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from '../providers/auth/auth.service';

@NgModule({
  imports: [
    AuthRouter,
    CommonModule,
    FormsModule,
    CookieModule,
    ToastyModule.forRoot(),
    RouterModule,
    NgbModule
  ],
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
