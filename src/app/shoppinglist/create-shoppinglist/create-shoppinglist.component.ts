import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shopping-list.service';
import {ShoppingList} from '../shopping-list';

@Component({
  selector: 'app-create-shoppinglist',
  templateUrl: './create-shoppinglist.component.html',
  styleUrls: ['./create-shoppinglist.component.scss']
})
export class CreateShoppinglistComponent implements OnInit {

  private shoppingList: ShoppingList = new ShoppingList();
  errorMessage: string;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
  }


  save() {
    console.log(this.shoppingList.name);
    if (this.isValid(this.shoppingList)) {
      return;
    }
  }

  private isValid(shoppingList: ShoppingList) {
    this.errorMessage = undefined;
    if (!this.shoppingList.validate()) {
      this.errorMessage = this.shoppingList.name + ' is not a valid name!';
      return false;
    }
    return true;
  }
}
