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
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  createShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    const headers = AuthenticationService.createHeaders();
    return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, {headers});
  }

  getShoppingListByID(id: string) {
    const user = JSON.parse(sessionStorage.getItem('currentUser')).user.email;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', 'basic ' + btoa(user + ':'));
    return this.http.get<ShoppingList>(this.shoppingListUrl + `/${id}`, {headers});
  }

  addProduct(product: Product, shoppingList: ShoppingList) {
    const entry: Entry = new Entry();
    entry.product = product.productName;
    if (product.productQuantity) {
      entry.quantity = product.productQuantity;
    }
    const headers = AuthenticationService.createHeaders();
    return this.http.put<ShoppingList>(`${this.shoppingListUrl}/${shoppingList.id}/add`, entry, {headers});
  }
}
