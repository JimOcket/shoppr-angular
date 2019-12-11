import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ShoppingList} from '../../shared/shopping-list';
import {Entry} from '../../shared/entry';
import {Product} from '../../shared/product';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent implements OnInit {
  // add product
  productName: string;
  productQuantity: string;
  displayAddProduct = 'none';
  // add product
  private shoppingList: ShoppingList;
  private id: string;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private location: Location) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.setShoppingList();
  }

  private setShoppingList() {
    this.shoppingListService.getShoppingListByID(this.id)
      .subscribe(shoppingList => {
        this.shoppingList = shoppingList;
        console.log(this.shoppingList);
      });
  }

  showAddProduct() {
    this.displayAddProduct = 'block';
  }

  addProduct() {
    const entry: Entry = new Entry();
    entry.product = new Product(this.productName);
    if (this.productQuantity) {
      entry.quantity = this.productQuantity;
    }
    this.shoppingListService.addProduct(entry, this.shoppingList).subscribe(() => {
      this.displayAddProduct = 'none';
      this.setShoppingList();
    });
  }
}
