import {createReducer, on} from "@ngrx/store";
import {setUser} from "../actions/auth";

export interface AuthState {
  user: any,
}

export const initialState: AuthState = {
  user: null,
}

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => {
    return {
      ...state,
      user
    }
  }),
);
