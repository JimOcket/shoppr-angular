import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authenticationService';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  private loginStatus: string;

  private static getUser() {
    const currentUser: string = sessionStorage.getItem('currentUser');
    console.log(currentUser);
    if (currentUser) {
      const email = JSON.parse(currentUser).user.email;
      if (email !== undefined && email !== null) {
        return email;
      }
    }
    return 'Guest';
  }

  ngOnInit() {
    this.loginStatus = MenuBarComponent.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl(`authentication`).then(r => r);
    this.update();
  }

  update() {
    this.loginStatus = MenuBarComponent.getUser();
  }
}
