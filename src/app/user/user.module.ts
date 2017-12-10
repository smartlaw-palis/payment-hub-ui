import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRouter } from './user.router';
import { LayoutModule } from '../layout/layout.module';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppsComponent } from './apps/apps.component';
import { AppPaymentsComponent } from './app-payments/app-payments.component';
import { UserService } from '../providers/user/user.service';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastyModule.forRoot(),
    NgbModule,
    LayoutModule,
    UserRouter,
    ClipboardModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    AppsComponent,
    AppPaymentsComponent
  ],
  providers: [UserService]
})
export class UserModule { }
