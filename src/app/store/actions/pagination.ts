import {createAction, props} from "@ngrx/store";
import {Article} from "../../shared/interfaces";

export const setPaginatedArticles = createAction('[PAGINATION] set paginated articles',
  props<{paginatedArticles: Article[]}>()
);
export const updatePage = createAction('[PAGINATION] update page',
  props<{pageIndex: number}>()
);
