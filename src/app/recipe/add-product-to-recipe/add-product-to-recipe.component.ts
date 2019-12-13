import { Component, OnInit } from '@angular/core';
import {ListenerService} from '../../shared/listener.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Entry} from '../../shared/entry';
import {Product} from '../../shared/product';
import {RecipeService} from '../../shared/recipe.service';

@Component({
  selector: 'app-add-product-to-recipe',
  templateUrl: './add-product-to-recipe.component.html',
  styleUrls: ['./add-product-to-recipe.component.scss']
})
export class AddProductToRecipeComponent implements OnInit {


  constructor(private recipeService: RecipeService, private listener: ListenerService) {
  }

  submitted;
  addProductForm: FormGroup;

  private static createFormGroup() {
    return new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productQuantity: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.addProductForm = AddProductToRecipeComponent.createFormGroup();
  }

  addProduct() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    this.sendEntry(this.createEntry());
  }

  private sendEntry(entry: Entry) {
    const recipeId: string = sessionStorage.getItem('recipeID');
    this.recipeService.addProduct(entry, recipeId).subscribe(() => {
      this.listener.updateAddProduct('none');
      this.updateRecipe(recipeId);
      this.addProductForm = AddProductToRecipeComponent.createFormGroup();
      this.submitted = false;
    });
  }

  private createEntry() {
    const entry: Entry = new Entry();
    entry.product = new Product(this.addProductForm.get('productName').value);
    if (this.addProductForm.get('productQuantity').value) {
      entry.quantity = this.addProductForm.get('productQuantity').value;
    }
    return entry;
  }

  private updateRecipe(id: string) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.listener.updateRecipe(recipe);
    });
    sessionStorage.removeItem('recipeID');
  }

  resetErrors() {
    this.submitted = null;
  }

  get nameOfProduct() {
    return this.addProductForm.get('productName');
  }
}
