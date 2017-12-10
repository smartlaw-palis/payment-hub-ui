import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any = null;
  avatar: any = null;
  isAdmin: any = false;

  constructor(
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.isAdmin = this._authService.utils.isAdmin();
    this.user = this._authService.userName();
    this.avatar = this._authService.getAvatar();
  }

  logout() {
    this._authService.logout()
      .then((res: any) => {
        setTimeout(() => {
          window.location.href = '/auth';
        }, 1000);
      })
      .catch(err => {
        console.log(err.detail)
      })
  }

}
