import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[] = [];

  cartItems: CartItem[] = [];

  cartTotal: number = 0;

  ngOnInit(): void {
    this.products = this.productService.findAll();
    this.loadSessionStorage();
    this.calculateCartTotal();
  }

  onAddToCart(product: Product) {
    const hasItem = this.cartItems.find(item => item.product.id === product.id);
    if (hasItem) {
      hasItem.quantity++;
    } else {
      this.cartItems = [...this.cartItems, {product: {...product}, quantity: 1}];
    }
    this.calculateCartTotal();
    this.saveSessionStorage();
  }

  onRemoveFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== id);
    if(this.cartItems.length === 0){
      sessionStorage.removeItem('cartItems');
    }
    this.calculateCartTotal();
    this.saveSessionStorage();
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((acomulaitor, item) => acomulaitor + (item.product.price * item.quantity), 0);
  }

  saveSessionStorage(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    sessionStorage.setItem('cartTotal', JSON.stringify(this.cartTotal));
  }

  loadSessionStorage(): void {
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal') || '[]');
  }

}
