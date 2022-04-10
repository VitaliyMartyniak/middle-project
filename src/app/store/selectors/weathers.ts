import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WeathersState} from "../reducers/weathers";

export const featureSelector = createFeatureSelector<WeathersState>('weathers');
export const weathersSelector = createSelector(
  featureSelector,
  state => state.weathers
);

export const weathersLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
);
