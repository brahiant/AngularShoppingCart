import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  @Input() items: CartItem[] = [];
  @Input() cartTotal = 0;
  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter<number>();

  onRemoveFromCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}
