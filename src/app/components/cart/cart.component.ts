import { Component, OnInit} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{

  items: CartItem[] = [];
  cartTotal = 0;

  constructor( private sharingDataService: SharingDataService, private store: Store<{items: ItemsState}>) {
    this.store.select('items').subscribe(items => {
      this.items = items.items;
      this.cartTotal = items.total;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number){
    this.sharingDataService.idProductEventEmitter.emit(id);
  }

}
