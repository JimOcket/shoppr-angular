import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../shared/recipe.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  submitted;
  duplicate;

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    const currentUser: string = sessionStorage.getItem('currentUser');
    if (currentUser === null) {
      this.router.navigateByUrl('authentication').then(r => r);
    }
    this.recipeForm = this.createRecipeForm();
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

    this.recipeService.createRecipe(this.recipeForm.value).subscribe(
      createdRecipe => { },
      error => this.duplicate = error
    )
  }

  resetErrors() {
    this.duplicate = null;
    this.submitted = null;
  }

}
