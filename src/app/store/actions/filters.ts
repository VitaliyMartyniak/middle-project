import {createAction, props} from "@ngrx/store";
import {Article} from "../../shared/interfaces";

export const setFilteredArticles = createAction('[FILTERS] set filtered articles',
  props<{filteredArticles: Article[]}>()
);
export const setCategory = createAction('[FILTERS] set category',
  props<{category: string}>()
);
export const setOrder = createAction('[FILTERS] set order',
  props<{order: string}>()
);
export const debounceInput = createAction('[FILTERS] debounce input',
  props<{value: string}>()
);
export const setSearch = createAction('[FILTERS] set search',
  props<{search: string}>()
);
