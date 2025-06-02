import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';
@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {

  @Input() cartItems: CartItem[] = [];
  //@Input() cartTotal = 0;
  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter<number>();
  @Output() closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  closeCart(): void {
   this.closeEventEmitter.emit();
 }

  onRemoveFromCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }


}
