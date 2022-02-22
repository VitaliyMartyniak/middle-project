import {createReducer, on} from "@ngrx/store";
import {setArticles} from "../actions/articles";
import {Article} from "../../shared/interfaces";

export interface ArticlesState {
  articles: Article[],
}

export const initialState: ArticlesState = {
  articles: [
    {
      photo: 'string',
      category: 'PRODUCTIVITY',
      date: '4 days ago',
      title: '7 Skills of Highly Effective Programmers',
      text: 'Our team was inspired by the seven skills of highly effective programmers created by the TechLead. We wanted to provide our own take on the topic...',
      authorName: 'Glen Williams',
    },
    {
      photo: 'string',
      category: 'PRODUCTIVITY',
      date: '4 days ago',
      title: '7 Skills of Highly Effective Programmers',
      text: 'Our team was inspired by the seven skills of highly effective programmers created by the TechLead. We wanted to provide our own take on the topic...',
      authorName: 'Glen Williams',
    }
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
);
