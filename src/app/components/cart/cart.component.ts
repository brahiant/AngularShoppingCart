import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItem';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  items: CartItem[] = [];
  cartTotal = 0;
  idProductEventEmitter : EventEmitter<number> = new EventEmitter<number>();


  onRemoveFromCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateCartTotal(): void {
    this.cartTotal = this.items.reduce((acomulaitor, item) => acomulaitor + (item.product.price * item.quantity), 0);
  }


}
