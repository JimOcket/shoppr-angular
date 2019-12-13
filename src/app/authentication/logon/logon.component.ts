import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {ListenerService} from '../../shared/listener.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {

  loginForm: FormGroup;
  private errorMessage: string;
  private submitted: boolean;


  constructor(private listener: ListenerService, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')])
    });
  }

  connect() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.get('email').value;
    this.authService.login(email).subscribe(
      () => this.router.navigateByUrl('overview').then(r => r),
      () => this.errorMessage = 'There is no user with this email address');
  }

  resetErrors() {
    this.errorMessage = null;
    this.submitted = false;
  }

  validateEmailFormat() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please provide a valid email address.';
    } else {
      this.errorMessage = null;
    }
  }
}
