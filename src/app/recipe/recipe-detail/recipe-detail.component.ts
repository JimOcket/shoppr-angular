import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../shared/recipe';
import {ListenerService} from '../../shared/listener.service';
import {AuthenticationService} from '../../shared/authenticationService';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  displayShoppingLists: boolean;
  userId: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private listener: ListenerService) {
  }

  ngOnInit() {
    this.getRecipe();
    if (sessionStorage.getItem('currentUser')) {
      this.userId = AuthenticationService.getUserId();
    }
    this.listener.displaySelectShoppingList.subscribe(value => this.displayShoppingLists = value);
  }

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(id).subscribe(
      recipe => {
        this.recipe = recipe;
      });

  }

  removeEntry(recipeId: number, entryId: number) {
    if (AuthenticationService.getUserId() === this.recipe.ownerId){
      this.recipeService.removeProduct(recipeId, entryId).subscribe(recipe => this.recipe = recipe);
    }
  }

  toggleShoppingListSelection() {
    this.listener.updateRecipe(this.recipe);
    this.listener.updateSelectShoppingList(!this.displayShoppingLists);
  }
}
