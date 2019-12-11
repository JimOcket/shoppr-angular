import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {ShopprAuthentication} from '../../shared/ShopprAuthentication';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListenerService} from '../../listener.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  submitted;
  duplicate: any;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private listener: ListenerService) {
  }

  ngOnInit() {
    this.accountForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('email@domain.com',
        [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')])
    });
  }

  get email() {
    return this.accountForm.get('email');
  }

  save() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }

    this.userService.createAccount(this.accountForm.value).subscribe(
      getAccount => {
        this.authService.login(getAccount.email).subscribe(
          () => {
            if (sessionStorage.getItem('currentUser') !== undefined) {
              const user: ShopprAuthentication = JSON.parse(localStorage.getItem('currentUser'));
              this.router.navigateByUrl(`create-shoppinglist`).then(r => r);
              this.listener.update(JSON.parse(sessionStorage.getItem('currentUser')).user.email);
              this.router.navigateByUrl('create-shoppinglist').then(r => r);
            }
          });
      },
      error => this.duplicate = error
    );
  }

  resetErrors() {
    this.duplicate = null;
    this.submitted = false;
  }
}
