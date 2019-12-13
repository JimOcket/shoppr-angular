import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../shared/recipe';
import {ListenerService} from '../../shared/listener.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  displayAddProduct;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private listener: ListenerService) {
  }

  ngOnInit() {
    this.getRecipe();
    this.listener.displayAddProductRecipe.subscribe(display => this.displayAddProduct = display);
    this.listener.updateAddProductRecipe('none');
  }

  getRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(id).subscribe(
      recipe => {
        this.listener.recipe.subscribe(listenerRecipe => this.recipe = listenerRecipe);
        this.listener.updateRecipe(recipe);
      });
  }

  showAddProduct() {
    this.listener.updateAddProductRecipe('block');
  }
}
