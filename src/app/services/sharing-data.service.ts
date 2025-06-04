import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEventEmitter : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  get idProductEventEmitter() : EventEmitter<number> {
    return this._idProductEventEmitter;
  }
}
