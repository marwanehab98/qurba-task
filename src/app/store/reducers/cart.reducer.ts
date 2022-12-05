import { createReducer, on } from '@ngrx/store';
import { Increment, Decrement } from '../actions/cart.action';


export const initialState = 0;

export const CartReducer = createReducer(
  initialState,
  on(Increment, (state) => state + 1),
  on(Decrement, (state) => state - 1),
);