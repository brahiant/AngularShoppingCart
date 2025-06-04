import { Component, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {

  products: Product[] = []

  productEventEmitter : EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private sharingDataService: SharingDataService, private router: Router) {
    this.products = this.router.getCurrentNavigation()?.extras.state?.['products'];
  }

  onAddToCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}
