import {pageIndexSelector, paginatedArticlesSelector} from "../pagination";

const paginationState = {
  paginatedArticles: [
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
  pageIndex: 1,
};

const state = {pagination: paginationState};

describe('Pagination selectors', () => {
  it('should return paginated articles', () => {
    const paginatedArticles = paginatedArticlesSelector(state);
    expect(paginatedArticles).toEqual(paginationState.paginatedArticles);
  });

  it('should return page index', () => {
    const pageIndex = pageIndexSelector(state);
    expect(pageIndex).toEqual(paginationState.pageIndex);
  });
});
