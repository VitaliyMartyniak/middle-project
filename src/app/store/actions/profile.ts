import {createAction, props} from "@ngrx/store";

export const setProfileLoading = createAction('[PROFILE] set profile loading',
  props<{isLoading: boolean}>()
);
