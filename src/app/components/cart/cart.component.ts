import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
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

  constructor(private router: Router, private sharingDataService: SharingDataService) {
     this.items = this.router.getCurrentNavigation()?.extras.state?.['cartItems'];
     this.cartTotal = this.router.getCurrentNavigation()?.extras.state?.['cartTotal'];
  }

  onDeleteCart(id: number){
    this.sharingDataService.idProductEventEmitter.emit(id);

  }


}
