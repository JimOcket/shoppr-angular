import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShoppingList} from './shopping-list';
import {Observable, of} from 'rxjs';
import {AppConnect} from './AppConnect';

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
    const user = JSON.parse(localStorage.getItem('currentUser')).user.email;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', 'basic ' + btoa(user + ':'));
    return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, {headers});
  }

  getShoppingListByID(id: string) {
    const user = JSON.parse(localStorage.getItem('currentUser')).user.email;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', 'basic ' + btoa(user + ':'));
    return this.http.get<ShoppingList>(this.shoppingListUrl + `/${id}`, {headers});
  }
}
