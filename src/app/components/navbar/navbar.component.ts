import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
   @Input() cartItems: CartItem[] = [];
   @Output() toggleCart: EventEmitter<void> = new EventEmitter<void>();

   toggleCartEvent(): void {
    this.toggleCart.emit();
  }

}
