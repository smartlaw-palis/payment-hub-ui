import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  stats:any = {
    apps: {}
  };
  isLoading = false;

  constructor(
    private _userService:UserService,
  ) { }

  ngOnInit() {
    this.getStats();
  }

  private getStats() {
    this.isLoading = true;
    this._userService.stats()
    .then(res => { this.stats = res; console.log(res); this.isLoading = false; })
    .catch(err => { console.log(err); this.isLoading = false; })
  }

}
