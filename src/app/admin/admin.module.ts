
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRouter } from './admin.router';
import { LayoutModule } from '../layout/layout.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AppsComponent } from './apps/apps.component';
import { UserService } from '../providers/user/user.service';
import { AuthService } from '../providers/auth/auth.service';
import { UserAppsComponent } from './user-apps/user-apps.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastyModule.forRoot(),
    NgbModule,
    LayoutModule,
    AdminRouter,
    ClipboardModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    AppsComponent,
    UserAppsComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class AdminModule { }
