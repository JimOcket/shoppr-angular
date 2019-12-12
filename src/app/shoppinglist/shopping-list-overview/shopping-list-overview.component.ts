import { Component, OnInit } from '@angular/core';
import {ShoppingList} from '../../shared/shopping-list';
import {ShoppingListService} from '../../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-list-overview',
  templateUrl: './shopping-list-overview.component.html',
  styleUrls: ['./shopping-list-overview.component.scss']
})
export class ShoppingListOverviewComponent implements OnInit {
  shoppingLists: ShoppingList[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.setShoppingLists();
  }

  private setShoppingLists() {
    if (sessionStorage.getItem('currentUser')) {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.shoppingListService.findAllOfUser(user.user.id)
        .subscribe(shoppingLists => this.shoppingLists = shoppingLists);
    }
  }

  getUser() {
    if (sessionStorage.getItem('currentUser')) {
      return JSON.parse(sessionStorage.getItem('currentUser')).user.email;
    }
  }

  removeShoppingList(shoppingListId: number) {
    // todo to be added later
  }
}
