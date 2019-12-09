import {Component, OnInit} from '@angular/core';
import {ShopprAuthentication} from '../shared/ShopprAuthentication';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  private loginStatus: string;
  private user: string = JSON.parse(localStorage.getItem('currentUser')).user.email;

  constructor() {
  }

  ngOnInit() {
    if (this.user === undefined || this.user === null) {
      this.loginStatus = 'Guest';
    } else {
      this.loginStatus = JSON.parse(localStorage.getItem('currentUser')).user.email;
    }
  }

}
