import {Component, OnInit} from '@angular/core';
import {ShoppingList} from '../../shared/shopping-list';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListenerService} from '../../shared/listener.service';
import {AppRedirect} from '../../shared/AppRedirect';

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
              private listener: ListenerService,
              private router: Router) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (!sessionStorage.getItem('currentUser')) {
      this.router.navigateByUrl(AppRedirect.getDefaultPage());
    }
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
    if (this.displayAddProduct === 'none') {
      this.listener.updateAddProduct('block');
    } else {
      this.listener.updateAddProduct('none');
    }
    sessionStorage.setItem('listID', this.shoppingList.id + '');
  }

  removeEntry(id: number) {
    this.shoppingListService.deleteProduct(id, this.shoppingList.id)
      .subscribe(shoppingList => this.listener.updateShoppingList(shoppingList));
  }
}
