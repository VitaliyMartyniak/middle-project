import {createAction, props} from "@ngrx/store";
import {Article} from "../../shared/interfaces";

export const setArticles = createAction('[ARTICLES] set articles',
  props<{articles: Article[]}>()
);
