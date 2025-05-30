import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {

  @Input() products: Product[] = []

  @Output() productEventEmitter : EventEmitter<Product> = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}
