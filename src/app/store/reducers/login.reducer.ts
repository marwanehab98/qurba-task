import { createReducer, on } from '@ngrx/store';
import { SetTrue, SetFalse } from '../actions/login.action';


export const initialState = 0;

export const LoginReducer = createReducer(
  initialState,
  on(SetTrue, (state) => 1),
  on(SetFalse, (state) => 0),
);