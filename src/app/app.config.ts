import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reducer';
import { productsReducer } from './store/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({items: itemsReducer, products: productsReducer})]
};
