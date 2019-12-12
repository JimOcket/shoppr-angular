import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShoppingList} from './shopping-list';
import {Observable} from 'rxjs';
import {AppConnect} from './AppConnect';
import {Entry} from './entry';
import {AuthenticationService} from './authenticationService';
import {CreateShoppingList} from './CreateShoppingList';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingListUrl = `${AppConnect.getSiteUrl()}/shoppinglists`;

  constructor(private http: HttpClient) {
  }

  createShoppingList(shoppingList: CreateShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, AuthenticationService.createHeaders());
  }

  getShoppingListByID(id) {
    return this.http.get<ShoppingList>(this.shoppingListUrl + `/${id}`, AuthenticationService.createHeaders());
  }

  addProduct(entry: Entry, shoppingListId: string) {
    const headers = AuthenticationService.createHeaders();
    return this.http.put<ShoppingList>(`${this.shoppingListUrl}/${shoppingListId}/add`, entry, headers);
  }
}
