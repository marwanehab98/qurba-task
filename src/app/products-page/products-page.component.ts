import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Store, select, State } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SearchService } from '../search.service';
import { Increment } from '../store/actions/cart.action';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  dataPassed: any;
  subscription: Subscription;

  products: any = false;
  categories: any = false;
  selectedCategories: string[] = [];
  isLoggedIn$: Observable<number>;
  Cart$: Observable<number>;
  pages: number[] = [];
  selectedPage: number = 1;
  cart = 0;

  constructor(private loggedInStore: Store<{ isLoggedIn: number }>, private cartStore: Store<{ Cart: number}>, private productsService: ProductsService, private searchService: SearchService) {
    this.getAllProducts()
    this.getAllCategories()
    this.isLoggedIn$ = loggedInStore.select('isLoggedIn');
    this.Cart$ = cartStore.select('Cart');
    this.subscription = this.searchService.getData().subscribe(x => {
      this.searchProducts(x);
    });
  }

  ngOnInit(): void {
  }

  //Function to change the cart state on adding product to cart
  addProductToCart() {
    this.cartStore.dispatch(Increment());
  }

  //Function that changes page content on selecting page from pagination element
  changePage(page: number): void {
    if (page > 0 && page < this.pages.length+1)
      this.selectedPage = page;
    if (this.selectedCategories.length == 0) this.getAllProducts()
  }


  //Function that changes page elements on checking categories
  onCheck(category: string, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(category)
    }
    else {
      this.selectedCategories = this.selectedCategories.filter(function (cat: string) {
        return cat > category;
      });
    }
    this.changePage(1)
    if (this.selectedCategories.length > 0) {
      this.getCategoryProducts();
    }
    else {
      this.getAllProducts();
    }
  }

  //Function that fetches products of a certain category
  //Calls on the products service
  private getCategoryProducts() {
    var products: any = [];
    this.selectedCategories.forEach(category => {
      this.productsService.getCategoryProducts(category)
        .pipe()
        .subscribe(res => {
          if (res) {
            products = [...products, ...res.products];
            let tempProducts: any[] = [];
            Object.assign(tempProducts, products);
            const categorizedProducts = [];
            while (tempProducts.length)
              categorizedProducts.push(tempProducts.splice(0, 9));
            this.products = categorizedProducts;
            this.pages = Array(Math.ceil(products.length / 9)).fill(0).map((_, i) => i);
          }
          else {
            console.error("failed to get products");
          }
        });
    });
  }

  //Function that gets all products
  //Calls on the products service
  getAllProducts(): void {
    this.productsService.getAllProducts(((this.selectedPage - 1) * 9).toString())
      .pipe()
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.showProductsHelper(res);
        }
        else {
          console.log("failed to get products")
        }
      })
  }

  //Function that gets products based on search query
  //Calls on the products service
  searchProducts(seachQuery: string): void {
    if (seachQuery == '') {
      this.getAllProducts();
      return
    }
    this.productsService.searchProducts(seachQuery)
      .pipe()
      .subscribe(res => {
        if (res) {
          this.showProductsHelper(res);
        }
        else {
          console.log("failed to get products")
        }
      })
  }

  //Helper function for getAllProducts() and searchProducts()
  private showProductsHelper(res: any) {
    const products = Array(this.selectedPage - 1).fill([1]);
    while (res.products.length)
      products.push(res.products.splice(0, 9));
    console.log(products);
    this.products = products;
    this.pages = Array(Math.ceil(res.total / 9)).fill(0).map((_, i) => i);
  }

  //Function that gets all product categories
  //Used to fill category box on the left of the page
  getAllCategories(): void {
    this.productsService.getAllCategories()
      .pipe()
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.categories = res
          console.log(this.categories)
        }
        else {
          console.log("failed to get products")
        }
      })
  }
}
