import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../authentication/create-account/account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl: string;

  constructor(private http: HttpClient) {
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.usersUrl, account);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.usersUrl);
  }
}
