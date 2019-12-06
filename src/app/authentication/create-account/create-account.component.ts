
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Account} from '../../shared/account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  account: Account = new Account();
  personalEmail: string;
  domainEmail: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  save() {
    this.account.email = this.personalEmail + '@' + this.domainEmail;
    if (this.validateEmail()) {
      this.userService.createAccount(this.account).subscribe(/*account => this.account = account*/);
    }
  }

  private validateEmail() {
    return !(this.account.email === null || this.userService.getAccounts().subscribe(accounts => accounts.includes(this.account)));
  }

}
