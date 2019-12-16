import { Component, OnInit } from '@angular/core';
import {ShoppingList} from '../../shared/shopping-list';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {AppRedirect} from '../../shared/AppRedirect';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-list-overview',
  templateUrl: './shopping-list-overview.component.html',
  styleUrls: ['./shopping-list-overview.component.scss']
})
export class ShoppingListOverviewComponent implements OnInit {
  shoppingLists: ShoppingList[];

  constructor(private shoppingListService: ShoppingListService, private router: Router) { }

  ngOnInit() {
    console.log(sessionStorage.getItem('currentUser'));
    if (!sessionStorage.getItem('currentUser')) {
      this.router.navigateByUrl(AppRedirect.getDefaultPage());
    }
    this.setShoppingLists();
  }

  private setShoppingLists() {
    if (sessionStorage.getItem('currentUser')) {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.shoppingListService.findAllOfUser(user.user.id)
        .subscribe(shoppingLists => this.shoppingLists = shoppingLists.sort());
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
