import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, Router } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.actions';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [ NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService,
    private store: Store<{items: ItemsState}> //toma los valores del app.config.ts y el items.reducer
    ) { }

  cartItems: CartItem[] = [];

  cartTotal: number = 0;

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    // Suscribirse al store
    const storeSub = this.store.select('items').subscribe(items => {
      this.cartItems = items.items;
      this.cartTotal = items.total;
    });
    this.subscriptions.add(storeSub);
    
    this.store.dispatch(total());
    this.onRemoveFromCart(); //No se ejecuta el eliminar sino que se suscribe para que se ejecute cuando se emita el evento
    this.onAddToCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddToCart() {
    const addSub = this.sharingDataService.productsEventEmitter.subscribe(product => { //obtener el producto mediante el evento
    
    this.store.dispatch(add({product: product}));
    this.store.dispatch(total());
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
          
          this.store.dispatch(remove({id: id}));
          this.store.dispatch(total());
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

  saveSessionStorage(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    sessionStorage.setItem('cartTotal', JSON.stringify(this.cartTotal));
  }

}
