import {Component, OnInit} from '@angular/core';
import {Entry} from '../../shared/entry';
import {Product} from '../../shared/product';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ListenerService} from '../../listener.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productName: string;
  productQuantity: string;


  constructor(private shoppingListService: ShoppingListService, private listener: ListenerService) {
  }

  ngOnInit() {
  }

  addProduct() {
    const entry: Entry = new Entry();
    entry.product = new Product(this.productName);
    if (this.productQuantity) {
      entry.quantity = this.productQuantity;
    }
    const shoppingListId: string = sessionStorage.getItem('listID');
    this.shoppingListService.addProduct(entry, shoppingListId).subscribe(() => {
      this.listener.updateAddProduct('none');
      this.updateShoppingList(shoppingListId);
    });
  }

  private updateShoppingList(id: string) {
    this.shoppingListService.getShoppingListByID(id).subscribe(shoppingList => {
      this.listener.updateShoppingList(shoppingList);
      });
    sessionStorage.removeItem('listID');
  }
}
