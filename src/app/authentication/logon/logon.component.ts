import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {
  personalEmail: string;
  domainEmail: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  connect() {
    const email = this.personalEmail + '@' + this.domainEmail;
    if (this.userService.connect(email)) {
      // todo save credentials
    }
  }
}
