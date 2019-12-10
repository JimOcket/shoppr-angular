import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ListenerService} from '../listener.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(private router: Router, private listener: ListenerService) {
  }

  private loginStatus: string;

  private static getUser() {
    const currentUser: string = localStorage.getItem('currentUser');
    console.log(currentUser);
    if (currentUser !== undefined && currentUser !== null) {
      const email = JSON.parse(currentUser).user.email;
      if (email !== undefined && email !== null) {
        return email;
      }
    }
    return 'Guest';
  }

  ngOnInit() {
    this.loginStatus = MenuBarComponent.getUser();
    this.listener.user.subscribe(user => this.loginStatus = user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl(`authentication`).then(r => r);
    this.update();
  }

  update() {
    this.loginStatus = MenuBarComponent.getUser();
  }
}
