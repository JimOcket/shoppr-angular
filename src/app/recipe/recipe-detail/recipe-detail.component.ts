import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../shared/recipe';

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
        console.log(recipe);
        this.recipe = recipe;
      });
  }

}
