import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe";
import {RecipeService} from "../../shared/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getAllRecipes().subscribe(
      recipes => this.recipes = recipes
    );
  }

  toRecipeDetail(id: number) {
    this.router.navigateByUrl('recipe-detail/' + id).then();
  }

  toCreateRecipe() {
    this.router.navigateByUrl('create-recipe').then();
  }
}
