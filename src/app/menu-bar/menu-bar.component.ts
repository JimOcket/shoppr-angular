import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor() {
  }

  private loginStatus: string;

  private static getUser() {
    const currentUser: string = localStorage.getItem('currentUser');
    if (currentUser !== undefined && currentUser !== null) {
      const email = JSON.parse(currentUser).user.email;
      if (email !== undefined && email !== null) {
        return email;
      }
    }
    return 'Guest';
  }

  ngOnInit() {
    this.loginStatus =  MenuBarComponent.getUser();
  }
}
