import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateShoppinglistComponent} from './shoppinglist/create-shoppinglist/create-shoppinglist.component';
import {ShoppingListDetailComponent} from './shoppinglist/shopping-list-detail/shopping-list-detail.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AppRedirect} from './shared/AppRedirect';
import {ShoppingListOverviewComponent} from './shoppinglist/shopping-list-overview/shopping-list-overview.component';
import {CreateRecipeComponent} from "./recipe/create-recipe/create-recipe.component";


const routes: Routes = [
  {path: 'authentication', component: AuthenticationComponent},
  {path: '', pathMatch: 'full', redirectTo: `${AppRedirect.getDefaultPage()}`},
  {path: 'create-shoppinglist', component: CreateShoppinglistComponent},
  {path: 'shopping-list-detail/:id', component: ShoppingListDetailComponent},
  {path: 'create-recipe', component: CreateRecipeComponent},
  {path: 'overview', component: ShoppingListOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
