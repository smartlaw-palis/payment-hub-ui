import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {

  user: any;
  submitBtn: any;
  alert: any;
  errors: any;
  routeToURL: any = null;

  constructor(
    private _toastyService:ToastyService,
    private _toastyConfig: ToastyConfig,
    private _cookieService: CookieService,
    private _authService: AuthService,
  ) {
    this.reset();
    this.routeToURL = this._authService.utils.routeToURL;
    this._toastyConfig.theme = 'bootstrap';
  }

  private reset() {
    this.errors = [];
    this.user = {
      email: '',
      password: ''
    };
    this.alert = {
      type: null,
      message: null
    };
    this.submitBtn = {
      isLoading: false,
      caption: 'Login'
    };
  }

  ngOnInit() {
  }

  login() {
    if (!this.submitBtn.isLoading) {
      this.errors = [];
      this.alert.type = null;
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';
      this._authService.login(this.user)
        .then((res: any) => {
          this.reset();
          if(this.routeToURL)
            window.location.href = this.routeToURL;
          else
            if(res.role == 'admin')
              window.location.href = '/admin';
            else
              window.location.href = '/user';
        })
        .catch(err => {
          this.submitBtn.isLoading = false;
          this.submitBtn.caption = 'Login';
          this.alert.type = 'danger';
          this.alert.message = err.message || err.error;
          this.errors = err.errors;
        })
    }
  }

}
