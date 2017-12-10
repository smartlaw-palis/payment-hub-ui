import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../providers/user/user.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
  selector: 'admin-user-apps',
  templateUrl: './user-apps.component.html',
  styleUrls: ['./user-apps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAppsComponent implements OnInit {

  apps:any = {
    data: []
  };
  userId: any = null;
  isLoading = false;
  pagination: any = {
    perPage: 10,
    page: 1
  };

  constructor(
    private _userService:UserService,
    private activatedRoute: ActivatedRoute,
    private _toastyService:ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
    this._toastyConfig.theme = 'bootstrap';
  }

  copied() {
    var toastOptions:ToastOptions = {
        title: "Message",
        msg: 'Copied to clipboard',
        showClose: true,
        timeout: 3000
    };
    this._toastyService.success(toastOptions);
  }

  shorten(str) {
    return this._userService.utils.shorten(str);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.getApps(this.userId);
    });
  }

  pageChange(ev) {
    this.pagination.page = ev;
    this.getApps(this.userId);
  }

  private getApps(userId) {
    this.isLoading = true;
    this._userService.userApps(userId, this.pagination.page, this.pagination.perPage)
    .then(res => { this.apps = res; this.isLoading = false; })
    .catch(err => { console.log(err); this.isLoading = false; })
  }


}
