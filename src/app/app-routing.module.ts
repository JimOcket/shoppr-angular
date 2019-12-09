import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AppRedirect} from './shared/AppRedirect';


const routes: Routes = [
  {path: 'authentication', component: AuthenticationComponent},
  {path: '', pathMatch: 'full', redirectTo: `${AppRedirect.getDefaultPage()}`},
  {path: 'home/:email', component: AuthenticationComponent}
  // todo redirect to user's homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
