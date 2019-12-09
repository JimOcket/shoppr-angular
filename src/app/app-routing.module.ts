import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateShoppinglistComponent} from './shoppinglist/create-shoppinglist/create-shoppinglist.component';
import {ShoppingListDetailComponent} from './shoppinglist/shopping-list-detail/shopping-list-detail.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AppRedirect} from './shared/AppRedirect';


const routes: Routes = [
  {path: 'authentication', component: AuthenticationComponent},
  {path: '', pathMatch: 'full', redirectTo: `${AppRedirect.getDefaultPage()}`},
  {path: 'home/:email', component: AuthenticationComponent}
  // todo redirect to user's homepage
  {path: '', redirectTo: 'create-shoppinglist', pathMatch: 'full'},
  {path: 'create-shoppinglist', component: CreateShoppinglistComponent},
  {path: 'shopping-list-detail/:id', component: ShoppingListDetailComponent},
  {path: 'authentication', component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
