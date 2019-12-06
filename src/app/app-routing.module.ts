import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateAccountComponent} from './authentication/create-account/create-account.component';


const routes: Routes = [
  {path: 'create-account', component: CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
