import {createReducer, on} from "@ngrx/store";
import {
  addNewWeatherLocation,
  setWeatherLocations,
  setWeathersLoading
} from "../actions/weathers";
import {LocationCoordinates} from "../../shared/interfaces";

export interface WeathersState {
  weatherLocations: LocationCoordinates[],
  isLoading: boolean,
}

export const initialState: WeathersState = {
  weatherLocations: [],
  isLoading: false,
}

export const weathersReducer = createReducer(
  initialState,
  on(setWeatherLocations, (state, {weatherLocations}) => {
    return {
      ...state,
      weatherLocations
    }
  }),
  on(addNewWeatherLocation, (state, {weatherLocation}) => {
    return {
      ...state,
      weatherLocations: [...state.weatherLocations, weatherLocation]
    }
  }),
  on(setWeathersLoading, (state, {isLoading}) => {
    return {
      ...state,
      isLoading,
    }
  }),
);
