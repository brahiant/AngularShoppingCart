import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges {

  @Input() items: CartItem[] = [];
  cartTotal = 0;
  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateCartTotal();
    this.saveSessionStorage();
  }

  onRemoveFromCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateCartTotal(): void {
    this.cartTotal = this.items.reduce((acomulaitor, item) => acomulaitor + (item.product.price * item.quantity), 0);
  }

  saveSessionStorage(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
    sessionStorage.setItem('cartTotal', JSON.stringify(this.cartTotal));
  }

   loadSessionStorage(): void {
    this.items = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    this.cartTotal = JSON.parse(sessionStorage.getItem('cartTotal') || '[]');
  }

}
