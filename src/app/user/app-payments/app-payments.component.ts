import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../providers/user/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';


@Component({
  selector: 'user-app-payments',
  templateUrl: './app-payments.component.html',
  styleUrls: ['./app-payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppPaymentsComponent implements OnInit {

  payments:any = {
    data: []
  };
  appId: null;
  isLoading = false;

  pagination: any = {
    perPage: 10,
    page: 1
  };

  addresses: any = [];

  constructor(
    private _userService:UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
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

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.appId = params['appId'];
      this.getPayments();
    });
  }

  showAddresses(content, addresses) {
    this.modalService.open(content);
    this.addresses = addresses;
  }

  shorten(str) {
    return this._userService.utils.shorten(str);
  }

  pageChange(ev) {
    this.pagination.page = ev;
    this.getPayments();
  }

  private getPayments() {
    this.isLoading = true;
    this._userService.appPayments(this.appId, this.pagination.page, this.pagination.perPage)
    .then(res => { this.payments = res; this.isLoading = false; })
    .catch(err => { console.log(err); this.isLoading = false; })
  }

}
