import {createReducer, on} from "@ngrx/store";
import {setProfileLoading} from "../actions/profile";

export interface ProfileState {
  isLoading: boolean,
}

export const initialState: ProfileState = {
  isLoading: false,
}

export const profileReducer = createReducer(
  initialState,
  on(setProfileLoading, (state, {isLoading}) => {
    return {
      ...state,
      isLoading,
    }
  }),
);
