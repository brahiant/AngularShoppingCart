import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEventEmitter : EventEmitter<number> = new EventEmitter<number>();

  private _productsEventEmitter : EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  get idProductEventEmitter() : EventEmitter<number> {
    return this._idProductEventEmitter;
  }

  get productsEventEmitter() : EventEmitter<Product> {
    return this._productsEventEmitter;
  }
}
