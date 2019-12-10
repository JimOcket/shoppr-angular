import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShoppingList} from './shopping-list';
import {Observable, of} from 'rxjs';
import {AppConnect} from './AppConnect';
import {Entry} from './entry';
import {AuthenticationService} from './authenticationService';
import {AddProductComponent} from '../add-product/add-product.component';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingListUrl = `${AppConnect.getSiteUrl()}/shoppingLists`;
  constructor(private http: HttpClient) {
  }

  createShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, AuthenticationService.createHeaders());
  }

  getShoppingListByID(id: string) {
    return this.http.get<ShoppingList>(this.shoppingListUrl + `/${id}`, AuthenticationService.createHeaders());
  }

  addProduct(productToAdd: Product, shoppingList: ShoppingList) {
    const entry: Entry = {product: productToAdd.productName, quantity: productToAdd.productQuantity};
    return this.http.put<ShoppingList>(`${this.shoppingListUrl}/${shoppingList.id}/add`, entry, AuthenticationService.createHeaders());
  }
}
