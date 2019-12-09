import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogonComponent} from './logon/logon.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {AuthenticationComponent} from './authentication.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../shared/authenticationService';


@NgModule({
  providers: [AuthenticationService],
  declarations: [LogonComponent,
    CreateAccountComponent,
    AuthenticationComponent],
  exports: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthenticationModule {
}
