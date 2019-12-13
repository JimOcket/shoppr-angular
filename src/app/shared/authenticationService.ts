import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConnect} from './AppConnect';
import {ShopprAuthentication} from './ShopprAuthentication';
import {ListenerService} from './listener.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private listener: ListenerService) {
  }

  static createHeaders(email?: string) {
    let emailCredential: string;
    if (email) {
      emailCredential = email;
    } else {
      emailCredential = JSON.parse(sessionStorage.getItem('currentUser')).user.email;
    }
    const headers = new HttpHeaders('Authorization:basic ' + btoa(emailCredential + ':'));
    return {headers};
  }

  login(email: string) {
    return this.http.post<ShopprAuthentication>(
      `${AppConnect.getSiteUrl()}/users/connect`, email, AuthenticationService.createHeaders(email)
    ).pipe(map(user => {
        if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.listener.updateUser(user.user.email);
        }
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}
