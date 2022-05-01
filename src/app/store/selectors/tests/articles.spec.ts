import {articlesLoadingSelector, articlesSelector} from "../articles";

const articlesState = {
  articles: [
    {
      photo: "string",
      category: "string",
      date: 1,
      title: "string",
      text: "string",
      authorName: "string",
      authorUID: "string",
    }
  ],
  isLoading: false,
};

const state = {articles: articlesState};

describe('Articles selectors', () => {
  it('should return articles', () => {
    const articles = articlesSelector(state);
    expect(articles).toEqual(articlesState.articles);
  });

  it('should return articles isLoading', () => {
    const isLoading = articlesLoadingSelector(state);
    expect(isLoading).toEqual(articlesState.isLoading);
  });
});
