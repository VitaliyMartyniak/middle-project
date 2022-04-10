import {createReducer, on} from "@ngrx/store";
import {addNewWeather, removeWeather, setWeathers, setWeathersLoading} from "../actions/weathers";
import {LocationCoordinates} from "../../shared/interfaces";

export interface WeathersState {
  weathers: LocationCoordinates[],
  isLoading: boolean,
}

export const initialState: WeathersState = {
  weathers: [],
  isLoading: false,
}

export const weathersReducer = createReducer(
  initialState,
  on(setWeathers, (state, {weathers}) => {
    return {
      ...state,
      weathers
    }
  }),
  on(addNewWeather, (state, {weather}) => {
    return {
      ...state,
      weathers: [...state.weathers, weather]
    }
  }),
  on(removeWeather, (state, {docID}) => {
    return {
      ...state,
      weathers: state.weathers.filter((weather: LocationCoordinates) => (weather.docID !== docID)),
    }
  }),
  on(setWeathersLoading, (state, {isLoading}) => {
    return {
      ...state,
      isLoading,
    }
  }),
);
