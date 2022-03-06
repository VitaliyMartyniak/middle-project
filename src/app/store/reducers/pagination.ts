import {createReducer, on} from "@ngrx/store";
import {setPaginatedArticles, updatePage} from "../actions/pagination";
import {Article} from "../../shared/interfaces";

export interface PaginationState {
  paginatedArticles: Article[];
  pageIndex: number;
}

export const initialState: PaginationState = {
  paginatedArticles: [],
  pageIndex: 0,
}

export const paginationReducer = createReducer(
  initialState,
  on(setPaginatedArticles, (state, action) => ({
    ...state,
    paginatedArticles: action.paginatedArticles
  })),
  on(updatePage, (state, action) => ({
    ...state,
    pageIndex: action.pageIndex
  })),
);
