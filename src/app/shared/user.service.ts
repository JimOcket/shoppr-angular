import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from './account';
import {AppConnect} from './AppConnect';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = `${AppConnect.getSiteUrl()}/users`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }),
  };

  constructor(private http: HttpClient) {
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.usersUrl, account, this.httpOptions);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.usersUrl);
  }
}
