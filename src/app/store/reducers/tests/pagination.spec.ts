import {initialState, paginationReducer} from "../pagination";
import {setPaginatedArticles, updatePage} from "../../actions/pagination";

describe('Pagination Reducer', () => {
  it('should return state with new paginated articles', () => {
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

    const state = paginationReducer(initialState, setPaginatedArticles({paginatedArticles: articles}));
    expect(state.paginatedArticles).toEqual(articles);
  });

  it('should return state with updated page', () => {
    const state = paginationReducer(initialState, updatePage({pageIndex: 1}));
    expect(state.pageIndex).toBe(1);
  });
});
