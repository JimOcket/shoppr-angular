import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../shared/recipe';
import {Entry} from '../../shared/entry';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getRecipe();
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
}
