import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {authReducer, AuthState} from "./reducers/auth";
import {articlesReducer, ArticlesState} from "./reducers/articles";
import {paginationReducer, PaginationState} from "./reducers/pagination";
import {filtersReducer, FiltersState} from "./reducers/filters";
import {profileReducer, ProfileState} from "./reducers/profile";
import {notificationsReducer, NotificationsState} from "./reducers/notifications";
import {weathersReducer, WeathersState} from "./reducers/weathers";

export interface State {
  auth: AuthState,
  articles: ArticlesState,
  pagination: PaginationState,
  filters: FiltersState,
  profile: ProfileState,
  notifications: NotificationsState,
  weathers: WeathersState,
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  articles: articlesReducer,
  pagination: paginationReducer,
  filters: filtersReducer,
  profile: profileReducer,
  notifications: notificationsReducer,
  weathers: weathersReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
