import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ShoppingList} from '../../shared/shopping-list';
import {AppRedirect} from '../../shared/AppRedirect';
import {Router} from '@angular/router';
import {Recipe} from '../../shared/recipe';
import {ListenerService} from '../../shared/listener.service';

@Component({
  selector: 'app-select-shoppinglist',
  templateUrl: './select-shoppinglist.component.html',
  styleUrls: ['./select-shoppinglist.component.scss']
})
export class SelectShoppinglistComponent implements OnInit {

  shoppingLists: ShoppingList[];
  recipe: Recipe;
  private successMessage: string;
  private displaySelectShoppingList: boolean;

  constructor(private shoppingListService: ShoppingListService,
              private router: Router,
              private listener: ListenerService) {
  }

  ngOnInit() {
    if (!sessionStorage.getItem('currentUser')) {
      this.router.navigateByUrl(AppRedirect.getDefaultPage());
    }
    this.setShoppingLists();
    this.setRecipe();
    this.listener.displaySelectShoppingList.subscribe(value => setTimeout(
      () => this.displaySelectShoppingList = value, 1));
  }

  private setShoppingLists() {
    if (sessionStorage.getItem('currentUser')) {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.shoppingListService.findAllOfUser(user.user.id)
        .subscribe(shoppingLists => this.shoppingLists = shoppingLists.sort());
    }
  }

  private addToShoppingList(shoppingListId) {
    this.shoppingListService.addRecipeToShoppingList(this.recipe, shoppingListId).subscribe(
      () => {
        this.successMessage = `Recipe for ${this.recipe.name} was added successfully to your shoppinglist!`;
        setTimeout(() => {
          this.listener.updateSelectShoppingList(false);
          this.successMessage = null;
        }, 1250);
      });
  }

  private setRecipe() {
    this.listener.recipe.subscribe(recipe => {
        this.recipe = recipe;
      }
    );
  }

  onClickedOutside(e: Event) {
    if (this.displaySelectShoppingList) {
      this.recipe = null;
      this.successMessage = null;
      this.listener.updateSelectShoppingList(false);
    }
  }
}
