import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShoppingList} from './shoppinglist/shopping-list';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingListUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  createShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    return of({
      name: shoppingList.name, id: '1', validate(): boolean {
        return true;
      }
    });
    // return this.http.post<ShoppingList>(this.shoppingListUrl, shoppingList, this.httpOptions);
  }

  getShoppingListByID(id: string) {
    return of({
      name: 'test', id: '1', validate(): boolean {
        return true;
      }
    });
    // return this.http.get<ShoppingList>(this.shoppingListUrl + `/${id}`);
  }
}
