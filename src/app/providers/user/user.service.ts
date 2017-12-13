import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Injectable()
export class UserService {

  private apiURL:any = null;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public utils: UtilsService,
    private http: Http
  ) {
    this.apiURL = this.utils.apiURL;
  }

  createApp(_data: any) {
    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiURL}/app/new`, JSON.stringify(_data), { headers: this.utils.createHeaders() })
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

  private doGetData(url) {
    return new Promise((resolve, reject) => {
        this.http.get(url, { headers: this.utils.createHeaders() })
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

  stats() {
    return this.doGetData(`${this.apiURL}/stats`);
  }

  users(page, perPage) {
    return this.doGetData(`${this.apiURL}/users/${perPage}/${page}`);
  }

  apps(page, perPage) {
    return this.doGetData(`${this.apiURL}/all-apps/${perPage}/${page}`);
  }

  userApps(userId, page, perPage) {
    return this.doGetData(`${this.apiURL}/user/${userId}/apps/${perPage}/${page}`);
  }

  myApps(page, perPage) {
    return this.doGetData(`${this.apiURL}/apps/${perPage}/${page}`);
  }

  appPayments(appId, page, perPage) {
    return this.doGetData(`${this.apiURL}/app/${appId}/payments/${perPage}/${page}`);
  }

  appPaymentData(appKey) {
    return new Promise((resolve, reject) => {
        this.http.get(`${this.apiURL}/payment/data`, { headers: this.utils.createPaymentHeaders(appKey) })
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
