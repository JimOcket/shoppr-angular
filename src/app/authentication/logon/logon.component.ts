import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {ShopprAuthentication} from '../../shared/ShopprAuthentication';
import {MenuBarComponent} from '../../menu-bar/menu-bar.component';
import {ListenerService} from '../../listener.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {
  personalEmail: string;
  domainEmail: string;

  constructor(private listener: ListenerService,
              private authService: AuthenticationService,
              private router: Router,
  ) {
  }

  ngOnInit() {
  }

  connect() {
    const email = this.personalEmail + '@' + this.domainEmail;
    this.authService.login(email).subscribe(() => {
      if (localStorage.getItem('currentUser') !== undefined) {
        const user: ShopprAuthentication = JSON.parse(localStorage.getItem('currentUser'));
        this.listener.update(JSON.parse(localStorage.getItem('currentUser')).user.email);
        this.router.navigateByUrl('create-shoppinglist').then(r => r);
      }
    });
  }
}
