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

  static createHeaders(email?: string, password?: string) {
    const emailCredential = this.getEmail(email);
    const passwordCredential = this.getPassword(password);
    const headers = new HttpHeaders('Authorization:basic ' + btoa(emailCredential + ':' + passwordCredential));
    return {headers};
  }

  private static getEmail(email?: string) {
    let emailCredential: string;
    if (email) {
      emailCredential = email;
    } else {
      emailCredential = JSON.parse(sessionStorage.getItem('currentUser')).user.email;
    }
    return emailCredential;
  }

  private static getPassword(password?: string) {
    let passwordCredential: string;
    if (password) {
      passwordCredential = password;
    } else {
      passwordCredential = JSON.parse(sessionStorage.getItem('currentUser')).user.password;
    }
    return passwordCredential;
  }

  static getUserId() {
    return JSON.parse(sessionStorage.getItem('currentUser')).user.id;
  }

  login(email: string, password: any) {
    return this.http.post<ShopprAuthentication>(
      `${AppConnect.getSiteUrl()}/users/connect`, email, AuthenticationService.createHeaders(email, password)
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
