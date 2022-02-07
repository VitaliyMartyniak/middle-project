import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {authReducer, AuthState} from "./reducers/auth";
// import {paginationReducer, PaginationState} from "./reducers/pagination";
// import {catalogReducer, CatalogState} from "./reducers/catalog";
// import {filtersReducer, FiltersState} from "./reducers/filters";
// import {notificationsReducer, NotificationsState} from "./reducers/notifications";

export interface State {
  auth: AuthState,
  // pagination: PaginationState;
  // catalog: CatalogState;
  // filters: FiltersState;
  // notifications: NotificationsState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  // pagination: paginationReducer,
  // catalog: catalogReducer,
  // filters: filtersReducer,
  // notifications: notificationsReducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
