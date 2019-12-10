import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {Account} from '../../shared/account';
import {ShopprAuthentication} from '../../shared/ShopprAuthentication';
import {MenuBarComponent} from '../../menu-bar/menu-bar.component';
import {ListenerService} from '../../listener.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  personalEmail: string;
  domainEmail: string;

  private static validateEmail(email: string) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private listener: ListenerService) {
  }

  ngOnInit() {
  }

  save() {
    const email = this.personalEmail + '@' + this.domainEmail;
    if (CreateAccountComponent.validateEmail(email)) {
      const account: Account = new Account();
      account.email = email;
      this.userService.createAccount(account).subscribe(getAccount => {
        this.authService.login(getAccount.email).subscribe(() => {
          if (sessionStorage.getItem('currentUser') !== undefined) {
            const user: ShopprAuthentication = JSON.parse(sessionStorage.getItem('currentUser'));
            this.router.navigateByUrl(`create-shoppinglist`).then(r => r);
            this.listener.update(JSON.parse(sessionStorage.getItem('currentUser')).user.email);
            this.router.navigateByUrl('create-shoppinglist').then(r => r);
          }
        });
      });
    }
  }
}
