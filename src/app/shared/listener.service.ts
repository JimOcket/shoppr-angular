import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ShoppingList} from './shopping-list';
import {Entry} from './entry';
import {Recipe} from './recipe';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  user = new Subject<string>();
  displayAddProduct = new Subject<string>();
  displayAddProductRecipe = new Subject<string>();
  displaySelectShoppingList = new Subject<boolean>();
  shoppingList = new Subject<ShoppingList>();
  recipe = new Subject<Recipe>();
  entries = new Subject<Entry[]>();

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

  updateSelectShoppingList(value: boolean) {
    this.displaySelectShoppingList.next(value);
  }

  updateEntries(entries: Entry[]) {
    this.entries.next(entries);
  }

  updateRecipe(recipe: Recipe) {
    this.recipe.next(recipe);
  }
}
