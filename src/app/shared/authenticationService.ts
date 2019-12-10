import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConnect} from './AppConnect';
import {ShopprAuthentication} from './ShopprAuthentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(email: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', 'basic ' + btoa(email + ':'));
    const connectUrl = `${AppConnect.getSiteUrl()}/users/connect`;
    return this.http.post<ShopprAuthentication>(connectUrl, email, {headers})
      .pipe(map(user => {
        if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}
