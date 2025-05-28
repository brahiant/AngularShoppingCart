import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[] = [];

  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  onAddToCart(product: Product) {
    const hasItem = this.cartItems.find(item => item.product.id === product.id);
    if (hasItem) {
      hasItem.quantity++;
    } else {
      this.cartItems = [...this.cartItems, {product: {...product}, quantity: 1}];
    }
  }

  onRemoveFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== id);
  }


}
