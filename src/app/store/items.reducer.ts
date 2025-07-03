import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.actions";

export interface ItemsState {
    items: CartItem[];
    total: number;
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cartItems') || '[]'),
    total:0
}
export const itemsReducer = createReducer(
    initialState,
    on(add, (state, {product}) => {
        const hasItem = state.items.find(item => item.product.id === product.id);
        if (hasItem) {
          hasItem.quantity++;
        } else {
          state.items = [...state.items, {product: {...product}, quantity: 1}];
        }
        return {
            ...state,
            items: state.items,
            total: state.total
        }
    }),
    on(remove, (state, {id}) => {
        state.items = state.items.filter(item => item.product.id !== id);
        return {
            ...state,
            items: state.items,
            total: state.total
        }
    }),
    on(total, state => {
        return {
            ...state,
            total: state.items.reduce((acomulaitor, item) => acomulaitor + (item.product.price * item.quantity), 0)
        }
    })
)