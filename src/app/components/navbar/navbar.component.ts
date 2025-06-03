import { Component,Input} from '@angular/core';
import { CartItem } from '../../models/cartItem';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
   @Input() cartItems: CartItem[] = [];
}
