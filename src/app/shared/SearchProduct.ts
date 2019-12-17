import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';
import {AppConnect} from './AppConnect';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchProduct {
  constructor(private http: HttpClient) {
  }

  search(name): Observable<Product[]> {
    return this.http
      .get(`${AppConnect.getSiteUrl()}/products?name=${name}`)
      .pipe(map(response => response as Product[]));
  }
}
