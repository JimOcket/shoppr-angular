import {Component, OnInit} from '@angular/core';
import {Entry} from '../../shared/entry';
import {Product} from '../../shared/product';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ListenerService} from '../../listener.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  constructor(private shoppingListService: ShoppingListService, private listener: ListenerService) {
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
    this.addProductForm = AddProductComponent.createFormGroup();
  }

  addProduct() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    this.sendEntry(this.createEntry());
  }

  private sendEntry(entry: Entry) {
    const shoppingListId: string = sessionStorage.getItem('listID');
    this.shoppingListService.addProduct(entry, shoppingListId).subscribe(() => {
      this.listener.updateAddProduct('none');
      this.updateShoppingList(shoppingListId);
      this.addProductForm = AddProductComponent.createFormGroup();
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

  private updateShoppingList(id: string) {
    this.shoppingListService.getShoppingListByID(id).subscribe(shoppingList => {
      this.listener.updateShoppingList(shoppingList);
    });
    sessionStorage.removeItem('listID');
  }

  resetErrors() {
    this.submitted = null;
  }

  get nameOfProduct() {
    return this.addProductForm.get('productName');
  }
}
