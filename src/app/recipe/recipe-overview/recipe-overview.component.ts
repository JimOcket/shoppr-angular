import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../shared/recipe';
import {RecipeService} from '../../shared/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipes: Recipe[];
  recipesForSearch: Recipe[];
  page = 1;

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getAllRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
        this.recipesForSearch = recipes;
      }
    );
  }

  toRecipeDetail(id: number) {
    this.router.navigateByUrl('recipe-detail/' + id).then();
  }

  search(term: string) {
    this.page = 1;
    if (term.length === 0) {
      this.recipes = this.recipesForSearch;
    } else {
      this.recipes = this.recipeService.searchItems(this.recipesForSearch, term);
    }
  }

  toCreateRecipe() {
    if (JSON.parse(sessionStorage.getItem('currentUser')) === null) {
      this.router.navigateByUrl('/authentication').then();
    } else {
      this.router.navigateByUrl('create-recipe').then();
    }
  }

  delete(id: any) {
    this.recipeService.deleteRecipe(id).subscribe(recipes => {
      this.recipes = recipes;
      this.recipesForSearch = recipes;
    });
  }
}
