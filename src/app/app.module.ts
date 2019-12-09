import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateShoppinglistComponent } from './shoppinglist/create-shoppinglist/create-shoppinglist.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { ShoppingListDetailComponent } from './shoppinglist/shopping-list-detail/shopping-list-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateShoppinglistComponent,
    AppComponent,
    MenuBarComponent,
    FooterBarComponent,
    ShoppingListDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
