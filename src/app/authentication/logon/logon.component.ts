import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {ShopprAuthentication} from '../../shared/ShopprAuthentication';
import {ListenerService} from '../../listener.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {
  personalEmail: string;
  domainEmail: string;

  constructor(private listener: ListenerService, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  connect() {
    const email = this.personalEmail + '@' + this.domainEmail;
    this.authService.login(email).subscribe(() => {
      this.router.navigateByUrl('create-shoppinglist').then(r => r);
    });
  }
}
