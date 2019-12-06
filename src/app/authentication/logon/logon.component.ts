import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {
  personalEmail: string;
  domainEmail: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  connect() {
    const email = this.personalEmail + '@' + this.domainEmail;
    this.authService.login(email).subscribe(() => {
      if (localStorage.getItem('currentUser') !== undefined) {
        this.router.navigateByUrl('http://localhost:5000').then(ignore => console.log(localStorage.getItem('currentUser')));
      }
    });
  }
}
