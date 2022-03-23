import {createReducer, on} from "@ngrx/store";
import {
  addNewArticle,
  removeArticle,
  setArticles,
  setArticlesLoading,
  updateArticle
} from "../actions/articles";
import {Article} from "../../shared/interfaces";

export interface ArticlesState {
  articles: Article[],
  isLoading: boolean,
}

export const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
}

export const articlesReducer = createReducer(
  initialState,
  on(setArticles, (state, {articles}) => {
    return {
      ...state,
      articles
    }
  }),
  on(addNewArticle, (state, {article}) => {
    return {
      ...state,
      articles: [...state.articles, article]
    }
  }),
  on(updateArticle, (state, {articleData, docID}) => {
    return {
      ...state,
      articles: state.articles.map((article: Article) => article.docID === docID ? {
        ...article,
        title: articleData.title,
        text: articleData.text,
        category: articleData.category,
        photo: articleData.photo,
      }: article),
    }
  }),
  on(removeArticle, (state, {docID}) => {
    return {
      ...state,
      articles: state.articles.filter((article: Article) => article.docID !== docID),
    }
  }),
  on(setArticlesLoading, (state, {isLoading}) => {
    return {
      ...state,
      isLoading,
    }
  }),
);
