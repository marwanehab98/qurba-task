import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClickTik';
  logoPath = '../assets/Logomark.svg'

  isLoggedIn$: Observable<number>;
  Cart$: Observable<number>;


  constructor(private loggedInStore: Store<{ isLoggedIn: number }>, private cartStore: Store<{ Cart: number}>, private searchService: SearchService) {
    this.isLoggedIn$ = loggedInStore.select('isLoggedIn');
    this.Cart$ = cartStore.select('Cart');
  }


  //Function that takes the search query from the search box value on pressing the Enter key
  search(event: any) {
    if(event.key === "Enter") {
      this.searchService.sendData(event.target.value);
    }; 
  }
}
