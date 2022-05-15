import {articlesReducer, ArticlesState, initialState} from "../articles";
import {addNewArticle, removeArticle, setArticles, setArticlesLoading, updateArticle} from "../../actions/articles";

describe('Articles Reducer', () => {
  it('should return state with new articles', () => {
    const articles = [
      {
        photo: "string",
        category: "string",
        date: 1,
        title: "string",
        text: "string",
        authorName: "string",
        authorUID: "string",
      }
    ];
    const state = articlesReducer(initialState, setArticles({articles}))
    expect(state.articles).toEqual(articles);
  });

  it('should return state with added article', () => {
    const article = {
      photo: "string2",
      category: "string2",
      date: 2,
      title: "string2",
      text: "string2",
      authorName: "string2",
      authorUID: "string2",
    }
    const state = articlesReducer(initialState, addNewArticle({article}))
    expect(state.articles).toEqual([article]);
  });

  it('should return state with updated article', () => {
    const previousState: ArticlesState = {
      articles: [
        {
          photo: "string2",
          category: "string2",
          date: 2,
          title: "string2",
          text: "string2",
          authorName: "string2",
          authorUID: "string2",
          docID: "one",
        }
      ],
      isLoading: false
    };
    const updatedArticleData = {
      photo: "string",
      category: "string",
      title: "string",
      text: "string",
    };
    const state = articlesReducer(previousState, updateArticle({articleData: updatedArticleData, docID: "one"}));
    expect(state.articles).toEqual([
      {
        ...previousState.articles[0],
        title: updatedArticleData.title,
        text: updatedArticleData.text,
        category: updatedArticleData.category,
        photo: updatedArticleData.photo,
      }
    ]);
  });

  it('should return state with removed article', () => {
    const previousState: ArticlesState = {
      articles: [
        {
          photo: "string2",
          category: "string2",
          date: 2,
          title: "string2",
          text: "string2",
          authorName: "string2",
          authorUID: "string2",
          docID: "one",
        }
      ],
      isLoading: false
    };
    const state = articlesReducer(previousState, removeArticle({docID: "one"}));
    expect(state.articles).toEqual([]);
  });

  it('should return state with isLoading true', () => {
    const state = articlesReducer(initialState, setArticlesLoading({isLoading: true}));
    expect(state.isLoading).toBe(true);
  });
});
