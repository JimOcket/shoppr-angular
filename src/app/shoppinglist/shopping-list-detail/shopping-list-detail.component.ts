import {Component, OnInit} from '@angular/core';
import {ShoppingList} from '../../shared/shopping-list';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ActivatedRoute} from '@angular/router';
import {ListenerService} from '../../listener.service';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent implements OnInit {

  shoppingList: ShoppingList;
  displayAddProduct;
  private id: string;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,
              private listener: ListenerService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.listener.shoppingList.subscribe(shoppingList => {
      this.shoppingList = shoppingList;
    });
    this.setShoppingList();
    this.listener.displayAddProduct.subscribe(display => {
      this.displayAddProduct = display;
    });
    this.listener.updateAddProduct('none');
  }

  private setShoppingList() {
    this.shoppingListService.getShoppingListByID(this.id)
      .subscribe(shoppingList => {
        this.listener.updateShoppingList(shoppingList);
      });
  }

  showAddProduct() {
    this.listener.updateAddProduct('block');
    sessionStorage.setItem('listID', this.shoppingList.id + '');
  }

}
