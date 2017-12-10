import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../providers/user/user.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'admin-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppsComponent implements OnInit {

  apps:any = {
    data: []
  };
  isLoading = false;
  pagination: any = {
    perPage: 10,
    page: 1
  };

  constructor(
    private _userService:UserService,
    private _toastyService:ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
  }

  shorten(str) {
    this._toastyConfig.theme = 'bootstrap';
    return this._userService.utils.shorten(str);
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

  ngOnInit() {
    this.getApps();
  }

  pageChange(ev) {
    this.pagination.page = ev;
    this.getApps();
  }

  private getApps() {
    this.isLoading = true;
    this._userService.apps(this.pagination.page, this.pagination.perPage)
    .then(res => { this.apps = res; this.isLoading = false; })
    .catch(err => { console.log(err); this.isLoading = false; })
  }

}
