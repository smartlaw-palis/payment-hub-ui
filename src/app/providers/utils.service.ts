import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { Headers } from '@angular/http';
import * as ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable()
export class UtilsService implements OnInit {

  public appName: string = "PaymentHub";
  public apiURL: string = `${environment.baseURL}/api/v1`;
  public baseURL: string = environment.baseURL;
  public isLoggedIn: boolean = false;

  private WebSocketBaseURL = `ws://${environment.url}`;
  routeToURL: string = '';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  subscribePayment(_payment_txid) {
    let socket = new ReconnectingWebSocket(`${this.WebSocketBaseURL}/payment/${_payment_txid}`);
    return socket;
  }

  constructor(
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this._cookieService.get(`${this.appName}_logged_in`) == 'true';
  }

  loggedIn() {
    return this._cookieService.get(`${this.appName}_logged_in`) == 'true';
  }

  isAdmin() {
    return this._cookieService.get(`${this.appName}_role`) == 'admin';
  }

  createHeaders() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Token', this._cookieService.get(`${this.appName}_token`));
    return headers;
  }

  createPaymentHeaders(appKey) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Api-Key', appKey);
    return headers;
  }

  userId() {
    let user:any = this._cookieService.get(`${this.appName}_user`);
    user = JSON.parse(user);
    return user.id;
  }

  user() {
    let user:any = this._cookieService.get(`${this.appName}_user`);
    return JSON.parse(user);
  }

  shorten(str) {
    return `${str.substring(0,5)}*****`;
  }

}
