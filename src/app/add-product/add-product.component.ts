import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../shared/shopping-list.service';
import {ShoppingListDetailComponent} from '../shoppinglist/shopping-list-detail/shopping-list-detail.component';
import {Product} from '../shared/product';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Product;


  constructor() {
    this.product = new Product();
  }

  ngOnInit() {
  }


}
