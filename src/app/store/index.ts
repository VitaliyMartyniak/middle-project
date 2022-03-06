import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {authReducer, AuthState} from "./reducers/auth";
import {articlesReducer, ArticlesState} from "./reducers/articles";
import {paginationReducer, PaginationState} from "./reducers/pagination";

export interface State {
  auth: AuthState,
  articles: ArticlesState,
  pagination: PaginationState,
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  articles: articlesReducer,
  pagination: paginationReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
