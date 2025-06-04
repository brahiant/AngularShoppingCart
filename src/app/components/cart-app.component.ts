import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  constructor(private sharingDataService: SharingDataService, private productService: ProductService) { }

  products: Product[] = [];

  cartItems: CartItem[] = [];

  cartTotal: number = 0;

  ngOnInit(): void {
    this.products = this.productService.findAll();
    this.loadSessionStorage();
    this.calculateCartTotal();
    this.onRemoveFromCart(); //No se ejecuta el eliminar sino que se suscribe para que se ejecute cuando se emita el evento
    this.onAddToCart();
  }

  onAddToCart() {
    this.sharingDataService.productsEventEmitter.subscribe(product => {
    const hasItem = this.cartItems.find(item => item.product.id === product.id);
    if (hasItem) {
      hasItem.quantity++;
    } else {
      this.cartItems = [...this.cartItems, {product: {...product}, quantity: 1}];
    }
    this.calculateCartTotal();
    this.saveSessionStorage();
    });
  }

  onRemoveFromCart() {
    // permite la suscripcion al evento
    this.sharingDataService.idProductEventEmitter.subscribe(id => { 
    this.cartItems = this.cartItems.filter(item => item.product.id !== id);
    if(this.cartItems.length === 0){
      sessionStorage.removeItem('cartItems');
    }
    this.calculateCartTotal();
    this.saveSessionStorage();
    });
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
