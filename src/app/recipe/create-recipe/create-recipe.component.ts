import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../shared/recipe.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Entry} from '../../shared/entry';
import {ListenerService} from '../../shared/listener.service';
import {Recipe} from '../../shared/recipe';
import {AuthenticationService} from '../../shared/authenticationService';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  submitted;
  duplicate;
  entries: Entry[];
  displayAddProduct;

  constructor(private recipeService: RecipeService,
              private router: Router, private listener: ListenerService) {
  }

  ngOnInit() {
    this.isConnected();
    this.recipeForm = this.createRecipeForm();
    this.listener.displayAddProductRecipe.subscribe(display => this.displayAddProduct = display);
    this.listener.updateAddProductRecipe('none');
    this.listener.entries.subscribe(entries => this.entries = entries);
    this.listener.updateEntries([]);
  }

  private isConnected() {
    const currentUser: string = sessionStorage.getItem('currentUser');
    if (currentUser === null) {
      this.router.navigateByUrl('authentication').then(r => r);
    }
  }

  createRecipeForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      amountOfServings: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  get name() {
    return this.recipeForm.get('name');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get amountOfServings() {
    return this.recipeForm.get('amountOfServings');
  }

  save() {
    this.submitted = true;
    if (this.recipeForm.invalid) {
      return;
    }

    this.recipeService.createRecipe(this.createRecipe()).subscribe(
      createdRecipe => {
        this.router.navigateByUrl('recipe-detail/' + createdRecipe.id).then();
      },
      error => this.duplicate = error
    );
  }

  resetErrors() {
    this.duplicate = null;
    this.submitted = null;
  }

  showAddProduct() {
    this.listener.updateAddProductRecipe('block');
  }

  private createRecipe() {
    const recipe: Recipe = this.recipeForm.value;
    recipe.entries = this.entries;
    recipe.ownerId = AuthenticationService.getUserId();
    return recipe;
  }
}
