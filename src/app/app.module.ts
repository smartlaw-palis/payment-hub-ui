import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRouter } from './app.router';

import { UtilsService } from './providers/utils.service';
import { AuthService } from './providers/auth/auth.service';
import { UserService } from './providers/user/user.service';
import {ToastyModule} from 'ng2-toasty';
import { TestService } from './providers/test.service';
import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users.guard';
import { OnlyAdminUsersGuard } from './guards/only-admin-users.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRouter,
    HttpModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    CookieModule.forRoot(),
    NgbModule.forRoot(),
    ToastyModule.forRoot()

  ],
  providers: [
    UtilsService,
    UserService,
    AuthService,
    TestService,
    OnlyLoggedInUsersGuard,
    OnlyAdminUsersGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
