import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WeathersState} from "../reducers/weathers";

export const featureSelector = createFeatureSelector<WeathersState>('weathers');
export const weatherLocationsSelector = createSelector(
  featureSelector,
  state => state.weatherLocations
);

export const weathersLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
);
