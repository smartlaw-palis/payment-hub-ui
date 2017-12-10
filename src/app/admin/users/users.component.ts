import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users:any = {
    data: []
  };
  isLoading = false;
  createModal: any = null;
  createSubmitBtn: any;
  user:any;
  pagination: any = {
    perPage: 10,
    page: 1
  };

  constructor(
    private _userService:UserService,
    private _authService:AuthService,
    private modalService: NgbModal,
    private _toastyService:ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
    this.reset();
    this._toastyConfig.theme = 'bootstrap';
  }

  reset() {
    this.user = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
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
      this._authService.signUp(this.user)
        .then((res: any) => {
          var toastOptions:ToastOptions = {
              title: "Message",
              msg: "User was created successfully.",
              showClose: true,
              timeout: 3000
          };
          this._toastyService.success(toastOptions);
          this.getUsers();
          this.reset();
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
    this.getUsers();
  }

  showCreateForm(content) {
    this.createModal = this.modalService.open(content);
  }

  pageChange(ev) {
    this.pagination.page = ev;
    this.getUsers();
  }

  private getUsers() {
    this.isLoading = true;
    this._userService.users(this.pagination.page, this.pagination.perPage)
    .then(res => { this.users = res; this.isLoading = false; })
    .catch(err => { console.log(err); this.isLoading = false; })
  }

}
