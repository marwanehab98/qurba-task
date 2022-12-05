import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './store/reducers/login.reducer';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartReducer } from './store/reducers/cart.reducer';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProductsPageComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ isLoggedIn: LoginReducer, Cart: CartReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
