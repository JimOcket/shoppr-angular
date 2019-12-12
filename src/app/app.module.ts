import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateShoppinglistComponent} from './shoppinglist/create-shoppinglist/create-shoppinglist.component';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {FooterBarComponent} from './footer-bar/footer-bar.component';
import {ShoppingListDetailComponent} from './shoppinglist/shopping-list-detail/shopping-list-detail.component';
import {AuthenticationModule} from './authentication/authentication.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShoppingListOverviewComponent } from './shoppinglist/shopping-list-overview/shopping-list-overview.component';
import {AddProductComponent} from './shoppinglist/add-product/add-product.component';
import {CreateRecipeComponent} from "./recipe/create-recipe/create-recipe.component";

@NgModule({
  declarations: [
    AppComponent,
    CreateShoppinglistComponent,
    AppComponent,
    MenuBarComponent,
    FooterBarComponent,
    ShoppingListDetailComponent,
    AddProductComponent,
    ShoppingListOverviewComponent,
    CreateRecipeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
