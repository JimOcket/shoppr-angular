import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateShoppinglistComponent} from './shoppinglist/create-shoppinglist/create-shoppinglist.component';


const routes: Routes = [
  {path: 'create-shoppinglist', component: CreateShoppinglistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
