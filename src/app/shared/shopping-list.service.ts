import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShoppingList} from './shopping-list';
import {Observable, of} from 'rxjs';
import {AppConnect} from './AppConnect';
import {Entry} from './entry';
import {AuthenticationService} from './authenticationService';
import {CreateShoppingList} from './CreateShoppingList';

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

  createShoppingList(shoppingList: CreateShoppingList): Observable<ShoppingList> {
    const headers = AuthenticationService.getCredentials();
    return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, {headers});
  }

  getShoppingListByID(id: string): Observable<ShoppingList> {
    const user = JSON.parse(sessionStorage.getItem('currentUser')).user.email;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', 'basic ' + btoa(user + ':'));
    return this.http.get<ShoppingList>(this.shoppingListUrl + `/${id}`, {headers});
  }

  addProduct(entry: Entry, shoppingList: ShoppingList) {
    const headers = AuthenticationService.getCredentials();
    return this.http.put<ShoppingList>(`${this.shoppingListUrl}/${shoppingList.id}/add`, entry, {headers});
  }
}
