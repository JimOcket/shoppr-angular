import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {Router} from '@angular/router';
import {CreateShoppingList} from '../../shared/CreateShoppingList';

@Component({
  selector: 'app-create-shoppinglist',
  templateUrl: './create-shoppinglist.component.html',
  styleUrls: ['./create-shoppinglist.component.scss']
})
export class CreateShoppinglistComponent implements OnInit {
  errorMessage: string;
  shoppingListName: string;

  constructor(private shoppingListService: ShoppingListService, private router: Router) {
  }

  ngOnInit() {
    const currentUser: string = sessionStorage.getItem('currentUser');
    if (currentUser === null) {
      this.router.navigateByUrl('authentication').then(r => r);
    }
  }


  save() {
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).user.id;
    const shoppingList = new CreateShoppingList(this.shoppingListName, userId);
    if (this.isValid(shoppingList)) {
      this.shoppingListService.createShoppingList(shoppingList).subscribe(
        shoppinglist => this.router.navigateByUrl('shopping-list-detail/' + shoppinglist.id).then(() => {
        }),
        () => this.errorMessage = `Name : ${this.shoppingListName} already used.`);
    }
  }

  private isValid(shoppingList: CreateShoppingList) {
    this.errorMessage = ' ';
    if (!shoppingList.validate()) {
      this.errorMessage = `${shoppingList.name} is not a valid name!`;
      return false;
    }
    return true;
  }

  resetErrors() {
    this.errorMessage = '';
  }
}
