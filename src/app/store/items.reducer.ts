import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.actions";

export interface ItemsState {
    items: CartItem[];
    total: number;
}

export const initialState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cartItems') || '[]') ,
    total: JSON.parse(sessionStorage.getItem('cartTotal') || '0')
}
export const itemsReducer = createReducer(
    initialState,
    on(add, (state, {product}) => {
        const hasItem = state.items.find(item => item.product.id === product.id);
        if (hasItem) {
          const updatedItems = state.items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return {
            ...state,
            items: updatedItems
          };
        } else {
          return {
            ...state,
            items: [...state.items, {product: {...product}, quantity: 1}]
          };
        }
    }),
    on(remove, (state, {id}) => {
        return {
            ...state,
            items: state.items.filter(item => item.product.id !== id)
        }
    }),
    on(total, state => {
        return {
            ...state,
            total: state.items.reduce((acomulaitor, item) => acomulaitor + (item.product.price * item.quantity), 0)
        }
    })
)