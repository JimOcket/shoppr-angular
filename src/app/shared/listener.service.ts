import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ShoppingList} from './shopping-list';
import {Entry} from './entry';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  user = new Subject<string>();
  displayAddProduct = new Subject<string>();
  displayAddProductRecipe = new Subject<string>();
  shoppingList = new Subject<ShoppingList>();
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

  updateEntries(entries: Entry[]) {
    this.entries.next(entries);
  }
}
