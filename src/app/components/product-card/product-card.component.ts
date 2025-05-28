import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product!: Product;

  @Output() productEventEmitter : EventEmitter<Product> = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}
