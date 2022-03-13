import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FiltersState} from "../reducers/filters";

export const featureSelector = createFeatureSelector<FiltersState>('filters');
export const filteredArticlesSelector = createSelector(
  featureSelector,
  state => state.filteredArticles
);
export const categorySelector = createSelector(
  featureSelector,
  state => state.category
);
export const orderSelector = createSelector(
  featureSelector,
  state => state.order
);
export const searchSelector = createSelector(
  featureSelector,
  state => state.search
);
