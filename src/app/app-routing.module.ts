import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateShoppinglistComponent} from './shoppinglist/create-shoppinglist/create-shoppinglist.component';
import {ShoppingListDetailComponent} from './shoppinglist/shopping-list-detail/shopping-list-detail.component';
import {AuthenticationComponent} from './authentication/authentication.component';


const routes: Routes = [
  {path: 'create-shoppinglist', component: CreateShoppinglistComponent},
  {path: 'shopping-list-detail/:id', component: ShoppingListDetailComponent},
  {path: 'authentication', component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
