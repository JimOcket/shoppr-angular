import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ShoppingList} from './shopping-list';
import {Recipe} from './recipe';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  user = new Subject<string>();
  displayAddProduct = new Subject<string>();
  displayAddProductRecipe = new Subject<string>();
  shoppingList = new Subject<ShoppingList>();
  recipe = new Subject<Recipe>();

  constructor() {
  }

  updateUser(user: string) {
    this.user.next(user);
  }

  updateAddProduct(display: string) {
    this.displayAddProduct.next(display);
  }

  updateAddProductRecipe(display: string) {
    this.displayAddProductRecipe.next(display);
  }

  updateShoppingList(shoppingList: ShoppingList) {
    this.shoppingList.next(shoppingList);
  }

  updateRecipe(recipe: Recipe) {
    this.recipe.next(recipe);
  }
}
