import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  //Input from the products page component
  @Input() product = {
    id: 0,
    title: 'name',
    description: '',
    price: 0,
    discountedPrice: 0,
    brand: '',
    category: '',
    stock: 0,
    rating: 5,
    numberOfReviews: 0,
    thumbnail: '../assets/Logomark.svg'
  };

  //Output to the products page component
  @Output() addProduct = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }


  //On click function for the add to cart button
  addToCart() {
    this.addProduct.emit(0);
  }
}
