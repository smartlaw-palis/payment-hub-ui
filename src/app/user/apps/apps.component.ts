import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'user-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppsComponent implements OnInit {

  apps:any = {
    data: []
  };

  newApp:any;
  createModal: any = null;
  createSubmitBtn: any;
  isLoading = false;

  pagination: any = {
    perPage: 10,
    page: 1
  };

  constructor(
    private _userService:UserService,
    private _toastyService:ToastyService,
    private _toastyConfig: ToastyConfig,
    private modalService: NgbModal
  ) {
    this._toastyConfig.theme = 'bootstrap';
    this.resetNewApp();
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

  showCreateForm(content) {
    this.createModal = this.modalService.open(content);
  }

  private resetNewApp() {
    this.newApp = {
      name: '',
      token_price: 0,
      unit_price: 'usd',
      btc_xpubkey: 'tpubD6NzVbkrYhZ4YahP3U1iX4VwM6WH2gkY7a2Q5j33ET4rsSsbUZaJrhvm3Pg1EsSXSBUEG3YXZqGDxdQdJkZdDw6nynAGHs8Cfuh42EoYahd',
      eth_xpubkey: 'xpub6F3UDWWniqSUcfPied5SPqhBTFuYwAS2dGPQo1Sjpen4tDN1p4cdwGQAEQRjjvpZViBs8Du6uW2YXgirbGxo8avtX54WLWwFRZnAqAj9WyH'
    };
    this.createSubmitBtn = {
      isLoading: false,
      caption: 'Submit'
    }
  }

  createApp() {
    if (!this.createSubmitBtn.isLoading) {
      this.createSubmitBtn.isLoading = true;
      this.createSubmitBtn.caption = 'Please wait...';
      this._userService.createApp(this.newApp)
        .then((res: any) => {
          var toastOptions:ToastOptions = {
              title: "Message",
              msg: res.message,
              showClose: true,
              timeout: 3000
          };
          this._toastyService.success(toastOptions);
          this.getApps();
          this.resetNewApp();
          this.createModal.close();
        })
        .catch(err => {
          this.createSubmitBtn.isLoading = false;
          this.createSubmitBtn.caption = 'Submit';

          var toastOptions:ToastOptions = {
              title: "Message",
              msg: err.message || err.error,
              showClose: true,
              timeout: 3000
          };
          this._toastyService.error(toastOptions);
        })
    }
  }

  ngOnInit() {
    this.getApps();
  }

  shorten(str) {
    return this._userService.utils.shorten(str);
  }

  pageChange(ev) {
    this.pagination.page = ev;
    this.getApps();
  }

  private getApps() {
    this.isLoading = true;
    this._userService.myApps(this.pagination.page, this.pagination.perPage)
    .then(res => { this.apps = res; this.isLoading = false; })
    .catch(err => { console.log(err); this.isLoading = false; })
  }

}
