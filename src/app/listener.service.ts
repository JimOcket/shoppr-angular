import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ShoppingList} from './shared/shopping-list';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  user = new Subject<string>();
  displayAddProduct = new Subject<string>();
  shoppingList = new Subject<ShoppingList>();

  constructor() {
  }

  updateUser(user: string) {
    this.user.next(user);
  }

  updateAddProduct(display: string) {
    this.displayAddProduct.next(display);
  }

  updateShoppingList(shoppingList: ShoppingList) {
    this.shoppingList.next(shoppingList);
  }

}
