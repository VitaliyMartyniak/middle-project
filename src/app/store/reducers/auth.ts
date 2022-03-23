import {createReducer, on} from "@ngrx/store";
import {setAuthLoading, setUser} from "../actions/auth";

export interface AuthState {
  user: any,
  isLoading: boolean,
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
}

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => {
    return {
      ...state,
      user
    }
  }),
  on(setAuthLoading, (state, {isLoading}) => {
    return {
      ...state,
      isLoading,
    }
  }),
);
