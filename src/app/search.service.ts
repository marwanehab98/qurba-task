//Service that is used to pass the search box value from app.component to product-page.component

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new Subject<any>();

  constructor() { }

  sendData(message: string) {
    this.subject.next(message);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
