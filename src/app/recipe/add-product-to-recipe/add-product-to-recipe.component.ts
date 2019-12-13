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

  entries;
  submitted;
  addProductForm: FormGroup;

  private static createFormGroup() {
    return new FormGroup({
      productName: new FormControl('', []/*[Validators.required]*/),
      productQuantity: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.addProductForm = AddProductToRecipeComponent.createFormGroup();
  }

  private findEntries() {
    this.listener.entries.subscribe(entries => this.entries = entries);
    if (this.entries === undefined) {
      this.entries = [];
    }
  }

  addProduct() {
    this.findEntries();
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    this.sendEntry(this.createEntry());
  }

  private sendEntry(entry: Entry) {
    const entries: Entry[] = this.entries;
    entries.push(entry);
    this.addProductForm = AddProductToRecipeComponent.createFormGroup();
    this.submitted = false;
    this.listener.updateEntries(entries);
  }

  private createEntry() {
    const entry: Entry = new Entry();
    entry.product = new Product(this.addProductForm.get('productName').value);
    if (this.addProductForm.get('productQuantity').value) {
      entry.quantity = this.addProductForm.get('productQuantity').value;
    }
    return entry;
  }

  resetErrors() {
    this.submitted = null;
  }

  get nameOfProduct() {
    return this.addProductForm.get('productName');
  }

  close() {
    this.listener.updateAddProductRecipe('none');
  }
}
