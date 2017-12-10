import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Injectable()
export class TestService {

  private apiURL:any = null;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    public utils: UtilsService,
    private http: Http
  ) {
    this.apiURL = this.utils.apiURL;
  }

  createPaymentRequest(appKey: any, _data: any) {
    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiURL}/payment/request`, JSON.stringify(_data), { headers: this.utils.createPaymentHeaders(appKey) })
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
