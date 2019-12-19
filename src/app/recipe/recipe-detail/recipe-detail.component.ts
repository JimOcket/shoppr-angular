import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../shared/recipe';
import {Entry} from '../../shared/entry';
import {ShoppingList} from '../../shared/shopping-list';
import {ListenerService} from '../../shared/listener.service';
import {log} from 'util';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  displayShoppingLists: boolean;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private listener: ListenerService) {
  }

  ngOnInit() {
    this.getRecipe();
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
    this.recipeService.removeProduct(recipeId, entryId).subscribe(recipe => this.recipe = recipe);
  }

  toggleShoppingListSelection() {
    this.listener.updateRecipe(this.recipe);
    this.listener.updateSelectShoppingList(!this.displayShoppingLists);
  }
}
