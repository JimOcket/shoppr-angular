import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  submitted;
  duplicate: any;

  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.accountForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  get email() {
    return this.accountForm.get('email');
  }

  get password() {
    return this.accountForm.get('password');
  }

  save() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this.userService.createAccount(this.accountForm.value).subscribe(
      createdAccount => {
        this.authService.login(createdAccount.email, createdAccount.password).subscribe(
          () => {
            this.router.navigateByUrl('shoppinglist-overview').then(r => r);
          }
        );
      },
      error => this.duplicate = error);
  }

  resetErrors() {
    this.duplicate = null;
    this.submitted = false;
  }
}
