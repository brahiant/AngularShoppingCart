import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { createEffect } from "@ngrx/effects";
import { ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { findAll, load } from "../products.actions";

@Injectable()
export class ProductsEffects{
    loadProduct$ = createEffect(() => this.actions$.pipe(
        ofType(load),
        exhaustMap(() => this.service.findAll().pipe(
            map(products => findAll({products}))
        ))
    ))

    constructor(private actions$: Actions, private service: ProductService){}

}