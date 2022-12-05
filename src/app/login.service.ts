import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Login API URL
  private API = 'https://dummyjson.com/auth/login';

  //Login API header
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  OnInit() {
  }

  //Function that calls on the Login API
  login(username: String, password: String): Observable<boolean> {
    return this.http.post<any>(this.API,
      JSON.stringify({
        username: username,
        password: password,
      }),
      this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
