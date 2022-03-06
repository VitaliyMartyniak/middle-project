import {createAction, props} from "@ngrx/store";
import {Article} from "../../shared/interfaces";

export const setArticles = createAction('[ARTICLES] set articles',
  props<{articles: Article[]}>()
);

export const addNewArticle = createAction('[ARTICLES] add new article',
  props<{article: Article}>()
);

export const updateArticle = createAction('[ARTICLES] update article',
  props<{articleData: any, docID: string}>()
);
