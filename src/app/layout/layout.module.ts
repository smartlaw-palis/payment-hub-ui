import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from '../providers/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthService
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
