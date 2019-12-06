import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from './account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'http://localhost:9020/users';

  constructor(private http: HttpClient) {
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.usersUrl, account);
  }

  connect(email: string): Observable<boolean> {
    return this.http.post<boolean>(this.usersUrl + '/connect', email);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.usersUrl);
  }
}
