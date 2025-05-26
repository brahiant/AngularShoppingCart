import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[] = [];

  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

}
