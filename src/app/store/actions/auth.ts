import {createAction, props} from "@ngrx/store";

export const setUser = createAction('[AUTH] set user',
  props<{user: any}>()
);

export const setAuthLoading = createAction('[AUTH] set auth loading',
  props<{isLoading: boolean}>()
);
