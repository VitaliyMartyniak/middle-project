import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProfileState} from "../reducers/profile";

export const featureSelector = createFeatureSelector<ProfileState>('profile');

export const profileLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
);
