import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  user = new Subject<string>();


  constructor() {
  }

  update(user: string) {
    this.user.next(user);
  }

}
