import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';
import {AppConnect} from './AppConnect';
import {map} from 'rxjs/operators';
import {AuthenticationService} from './authenticationService';
import {Observable} from 'rxjs';

@Injectable()
export class SearchProduct {
  constructor(private http: HttpClient) {
  }

  search(name): Observable<Product[]> {
    return this.http
      .get(`${AppConnect.getSiteUrl()}/products?name=${name}`, AuthenticationService.createHeaders())
      .pipe(map(response => response as Product[]));
  }
}
