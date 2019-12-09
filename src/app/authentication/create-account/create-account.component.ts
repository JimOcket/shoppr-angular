import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {Account} from '../../shared/account';
import {AppConnect} from '../../shared/AppConnect';

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

  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router) {
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
          if (localStorage.getItem('currentUser') !== undefined) {
            this.router.navigateByUrl('').then(r => r);
            // todo redirect to user's homepage
          }
        });
      });
    }
  }
}
