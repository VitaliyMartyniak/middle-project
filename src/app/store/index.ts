import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {authReducer, AuthState} from "./reducers/auth";
import {articlesReducer, ArticlesState} from "./reducers/articles";

export interface State {
  auth: AuthState,
  articles: ArticlesState
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  articles: articlesReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
