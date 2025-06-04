import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, Router } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [ NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private sharingDataService: SharingDataService, private productService: ProductService) { }

  cartItems: CartItem[] = [];

  cartTotal: number = 0;

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadSessionStorage();
    this.calculateCartTotal();
    this.onRemoveFromCart(); //No se ejecuta el eliminar sino que se suscribe para que se ejecute cuando se emita el evento
    this.onAddToCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddToCart() {
    const addSub = this.sharingDataService.productsEventEmitter.subscribe(product => {
    const hasItem = this.cartItems.find(item => item.product.id === product.id);
    if (hasItem) {
      hasItem.quantity++;
    } else {
      this.cartItems = [...this.cartItems, {product: {...product}, quantity: 1}];
    }
    this.calculateCartTotal();
    this.saveSessionStorage();
    this.router.navigate(['/cart'], {state: {cartItems: this.cartItems, cartTotal: this.cartTotal}});
    Swal.fire({
      title: 'Producto agregado al carrito',
      text: 'Nuevo producto agregado al carrito',
      icon: 'success'
    })
    });
    this.subscriptions.add(addSub);

  }

  onRemoveFromCart() {
    // permite la suscripcion al evento
    const removeSub = this.sharingDataService.idProductEventEmitter.subscribe(id => { 
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartItems = this.cartItems.filter(item => item.product.id !== id);
    if(this.cartItems.length === 0){
      sessionStorage.removeItem('cartItems');
    }
    this.calculateCartTotal();
    this.saveSessionStorage();
    this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
      this.router.navigate(['/cart'], {state: {cartItems: this.cartItems, cartTotal: this.cartTotal}});
    });
          Swal.fire({
            title: "Eliminado!",
            text: "Tu producto ha sido eliminado.",
            icon: "success"
          });
        }
      });
    
    });
    this.subscriptions.add(removeSub);
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
