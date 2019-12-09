import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  private loginStatus: string;
  private user: string = localStorage.getItem('user');

  constructor() {
  }

  ngOnInit() {
    if (this.user === undefined || this.user === null) {
      this.loginStatus = 'Guest';
    } else {
      this.loginStatus = localStorage.getItem('user');
    }
  }

}
