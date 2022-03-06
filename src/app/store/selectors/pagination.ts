import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PaginationState} from "../reducers/pagination";

export const featureSelector = createFeatureSelector<PaginationState>('pagination');
export const paginatedArticlesSelector = createSelector(
  featureSelector,
  state => state.paginatedArticles
);
export const pageIndexSelector = createSelector(
  featureSelector,
  state => state.pageIndex
);
