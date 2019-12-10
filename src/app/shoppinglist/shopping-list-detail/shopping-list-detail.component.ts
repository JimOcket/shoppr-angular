import {Component, OnInit} from '@angular/core';
import {ShoppingList} from '../../shared/shopping-list';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

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

  private shoppingList: ShoppingList = new ShoppingList('  ', 1);
  private id: string;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private location: Location) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.shoppingListService.getShoppingListByID(this.id)
      .subscribe(shoppingList => this.shoppingList = shoppingList);
  }

  showAddProduct() {
    this.displayAddProduct = 'block';
  }

  addProduct() {
    this.shoppingListService.addProduct(this.productName, this.productQuantity, this.shoppingList);
    this.displayAddProduct = 'none';
  }
}
