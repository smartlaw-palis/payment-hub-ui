import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

  private apiURL: string = "/auth";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public utils: UtilsService,
    private http: Http,
    private _cookieService: CookieService
  ) {
    this.apiURL = this.utils.apiURL + this.apiURL;
  }

  userName() {
    let user:any = this._cookieService.get(`${this.utils.appName}_user`);
    user = JSON.parse(user);
    return `${user.first_name} ${user.last_name}`;
  }

  getAvatar() {
    let user:any = this._cookieService.get(`${this.utils.appName}_user`);
    user = JSON.parse(user);
    return `${user.avatar}`;
  }

  login(_data: any) {
    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiURL}/login`, JSON.stringify(_data), { headers: this.headers })
          .map(res => res.json())
          .subscribe(data => {
            this._cookieService.put(`${this.utils.appName}_logged_in`, 'true');
            this._cookieService.put(`${this.utils.appName}_token`, data.token);
            this._cookieService.put(`${this.utils.appName}_role`, data.role);
            this._cookieService.putObject(`${this.utils.appName}_user`, data.user);
            resolve(data);
          },
          error => {
            reject(error.json());
          }
          );
      })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + '/logout', { headers: this.utils.createHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          this._cookieService.remove(`${this.utils.appName}_logged_in`);
          this._cookieService.remove(`${this.utils.appName}_allow_user_panel`);
          this._cookieService.remove(`${this.utils.appName}_token`);
          this._cookieService.remove(`${this.utils.appName}_user`);
          setTimeout(() => {
            resolve(data);
          },500)
        },
        error => {
          reject(error.json());
        }
        );
    })
  }

  signUp(_data: any) {
    return new Promise((resolve, reject) => {
        this.http.post(this.apiURL + '/register', JSON.stringify(_data), { headers: this.utils.createHeaders() })
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          },
          error => {
            reject(error.json());
          }
          );
    })
  }

}
