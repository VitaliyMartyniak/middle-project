import {createAction, props} from "@ngrx/store";
import {Article, ArticleUpdatableData} from "../../shared/interfaces";

export const setArticles = createAction('[ARTICLES] set articles',
  props<{articles: Article[]}>()
);

export const addNewArticle = createAction('[ARTICLES] add new article',
  props<{article: Article}>()
);

export const updateArticle = createAction('[ARTICLES] update article',
  props<{articleData: ArticleUpdatableData, docID: string}>()
);

export const removeArticle = createAction('[ARTICLES] remove article',
  props<{docID: string}>()
);

export const setArticlesLoading = createAction('[ARTICLES] set articles loading',
  props<{isLoading: boolean}>()
);
