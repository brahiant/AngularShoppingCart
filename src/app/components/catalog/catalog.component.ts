import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  

  products!: Product[]

  constructor(private productService: ProductService, private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
      this.products = this.productService.findAll();
  }

  onAddToCart(product: Product) {
    this.sharingDataService.productsEventEmitter.emit(product);
  }
}
