import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ShoppingList} from '../shopping-list';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-shoppinglist',
  templateUrl: './create-shoppinglist.component.html',
  styleUrls: ['./create-shoppinglist.component.scss']
})
export class CreateShoppinglistComponent implements OnInit {

  private shoppingList: ShoppingList = new ShoppingList(' ', 1);
  errorMessage: string;

  constructor(private shoppingListService: ShoppingListService, private router: Router) {
  }

  ngOnInit() {
  }


  save() {
    if (this.isValid(this.shoppingList)) {
      this.shoppingListService.createShoppingList(this.shoppingList).subscribe(shoppinglist => {
        this.shoppingList = shoppinglist;
        this.router.navigateByUrl('shopping-list-detail/' + this.shoppingList.id).then(r => {
        });
      });
    }
  }

  private isValid(shoppingList: ShoppingList) {
    this.errorMessage = ' ';
    if (!this.shoppingList.validate()) {
      this.errorMessage = `'${this.shoppingList.name}'` + ' is not a valid name!';
      return false;
    }
    return true;
  }
}
