import { Component, OnInit } from '@angular/core';
import { TestService } from '../providers/test.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public txid: any = '';
  public result : any = {};
  public status : any = [];
  public appKey : any = 'Dz91ZhDOchhbrlvwasxTcQUcXFA663omCnHOVkP9kbJfCrV4CWiYnZkC1JcSXefz';
  public app : any;
  public submitBtn : any;

  constructor(
    public _testService: TestService,
    private _toastyService:ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
    this._toastyConfig.theme = 'bootstrap';
    this.reset();
  }

  ngOnInit() {
  }

  private reset() {
    this.app = {
      payment_type: null,
      amount: null,
      note: null
    };
    this.submitBtn = {
      caption: 'Submit',
      isLoading: false
    };
  }

  submitPaymentRequest() {
    if (!this.submitBtn.isLoading) {
      this.submitBtn.isLoading = true;
      this.submitBtn.caption = 'Please wait...';
      this._testService.createPaymentRequest(this.appKey, this.app)
        .then((res:any) => {
          this.reset();
          this.result = res;
          let socket = this._testService.utils.subscribePayment(res.txid);
          socket.onclose = () => { console.log("Disconnected to notification socket"); }
          socket.onmessage = (msg) => { this.status.push(JSON.parse(msg.data)); }
          var toastOptions:ToastOptions = {
              title: "Message",
              msg: "Payment request was created successfully",
              showClose: true,
              timeout: 3000
          };
          this._toastyService.success(toastOptions);
        })
        .catch(err => {
          var toastOptions:ToastOptions = {
              title: "Message",
              msg: err.message || err.error,
              showClose: true,
              timeout: 3000
          };
          this._toastyService.error(toastOptions);
          this.submitBtn.isLoading = false;
          this.submitBtn.caption = 'Submit';
        })
    }
  }

}
