import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthenticationService} from '../../shared/authenticationService';
import {Router} from '@angular/router';
import {ShopprAuthentication} from '../../shared/ShopprAuthentication';
import {MenuBarComponent} from '../../menu-bar/menu-bar.component';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  submitted: false;
  duplicate: any;

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private menuBar: MenuBarComponent) {
  }

  ngOnInit() {
    this.accountForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('email@domain.com', [Validators.required, Validators.email])
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
            if (localStorage.getItem('currentUser') !== undefined) {
              const user: ShopprAuthentication = JSON.parse(localStorage.getItem('currentUser'));
              this.router.navigateByUrl(`create-shoppinglist`).then(r => r);
              this.menuBar.update();
            }
          });
      },
      error => this.duplicate = error
    );
  }

  resetDuplicate() {
    this.duplicate = null;
  }
}
