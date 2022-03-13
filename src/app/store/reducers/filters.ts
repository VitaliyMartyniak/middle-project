import {createReducer, on} from "@ngrx/store";
import {setCategory, setFilteredArticles, setOrder, setSearch} from "../actions/filters";
import {Article} from "../../shared/interfaces";

export interface FiltersState {
  filteredArticles: Article[],
  category: string,
  order: string,
  search: string,
}

export const initialState: FiltersState = {
  filteredArticles: [],
  category: 'All Categories',
  order: 'asc',
  search: '',
}

export const filtersReducer = createReducer(
  initialState,
  on(setFilteredArticles, (state, {filteredArticles}) => ({
    ...state,
    filteredArticles
  })),
  on(setCategory, (state, {category}) => ({
    ...state,
    category
  })),
  on(setOrder, (state, {order}) => ({
    ...state,
    order
  })),
  on(setSearch, (state, {search}) => ({
    ...state,
    search
  })),
);
