import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ArticlesState} from "../reducers/articles";

export const featureSelector = createFeatureSelector<ArticlesState>('articles');
export const articlesSelector = createSelector(
  featureSelector,
  state => state.articles
);
