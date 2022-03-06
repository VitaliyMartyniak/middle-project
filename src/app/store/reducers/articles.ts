import {createReducer, on} from "@ngrx/store";
import {addNewArticle, setArticles, updateArticle} from "../actions/articles";
import {Article} from "../../shared/interfaces";

export interface ArticlesState {
  articles: Article[],
}

export const initialState: ArticlesState = {
  articles: [
    // {
    //   photo: 'string',
    //   category: 'PRODUCTIVITY',
    //   date: '4 days ago',
    //   title: '7 Skills of Highly Effective Programmers',
    //   text: 'Our team was inspired by the seven skills of highly effective programmers created by the TechLead. We wanted to provide our own take on the topic...',
    //   authorName: 'Glen Williams',
    // },
    // {
    //   photo: 'string',
    //   category: 'PRODUCTIVITY',
    //   date: '4 days ago',
    //   title: '7 Skills of Highly Effective Programmers',
    //   text: 'Our team was inspired by the seven skills of highly effective programmers created by the TechLead. We wanted to provide our own take on the topic...',
    //   authorName: 'Glen Williams',
    // }
  ],
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
);
