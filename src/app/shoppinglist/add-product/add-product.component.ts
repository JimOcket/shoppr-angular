import {Component, OnChanges, OnInit} from '@angular/core';
import {Entry} from '../../shared/entry';
import {Product} from '../../shared/product';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ListenerService} from '../../shared/listener.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchProduct} from '../../shared/SearchProduct';
import {Observable, Subject, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, catchError} from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [SearchProduct]
})
export class AddProductComponent implements OnInit {
  private displayAddProduct: string;


  constructor(private shoppingListService: ShoppingListService,
              private listener: ListenerService, private search: SearchProduct) {
  }

  submitted;
  addProductForm: FormGroup;
  FoundProducts: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  private static createFormGroup() {
    return new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productQuantity: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.setSearchBox();
    this.addProductForm = AddProductComponent.createFormGroup();
    this.listener.displayAddProduct.subscribe(display => {
      setTimeout(() => this.displayAddProduct = display, 1);
    });
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
      this.updateShoppingList(shoppingListId);
      this.resetForm();
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
  }

  private resetForm() {
    this.addProductForm = AddProductComponent.createFormGroup();
    this.resetErrors();
  }

  resetErrors() {
    this.submitted = null;
  }

  get nameOfProduct() {
    return this.addProductForm.get('productName');
  }

  close() {
    this.addProductForm = AddProductComponent.createFormGroup();
    this.resetErrors();
    sessionStorage.removeItem('listID');
    this.listener.updateAddProduct('none');
  }

  onClickedOutside(ignore: Event) {
    if (this.displayAddProduct === 'block') {
      this.close();
    }
  }

  searchProduct(value: string) {
    this.searchTerms.next(value);
  }

  private setSearchBox() {
    this.FoundProducts = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term ? this.search.search(term) : of<Product[]>([])),
      catchError(error => {
        console.log(error);
        // todo show error to user
        return of<Product[]>([]);
      }));
  }
}
