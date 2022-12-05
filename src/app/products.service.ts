import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //Product API URLS
  private getAllProductsAPI = 'https://dummyjson.com/products?limit=9&skip=';
  private getAllCategoriesAPI = 'https://dummyjson.com/products/categories'
  private getCategoryProductsAPI = 'https://dummyjson.com/products/category/';
  private searchProductsAPI = 'https://dummyjson.com/products/search?q=';


  constructor(private http: HttpClient) { }

  //Function that calls on the get all products API
  getAllProducts(skip: string): Observable<any> {
    return this.http.get<any>(this.getAllProductsAPI.concat(skip))
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  //Function that calls on the search products API
  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(this.searchProductsAPI.concat(query))
      .pipe(
        catchError(this.handleError<any>(false))
      )
  }

  //Function the Calls on the get categories API
  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.getAllCategoriesAPI)
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  //Function that calls on the get category products API
  getCategoryProducts(category: string): Observable<any> {
    return this.http.get<any>(this.getCategoryProductsAPI.concat(category))
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  //A handle Error function that returns false if API calls fail
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T);
    };
  }
}
