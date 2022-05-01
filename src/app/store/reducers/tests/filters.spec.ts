import {filtersReducer, initialState} from "../filters";
import {setCategory, setFilteredArticles, setOrder, setSearch} from "../../actions/filters";

describe('Filters Reducer', () => {
  it('should return state with new filtered articles', () => {
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

    const state = filtersReducer(initialState, setFilteredArticles({filteredArticles: articles}));
    expect(state.filteredArticles).toEqual(articles);
  });

  it('should return state with new category', () => {
    const state = filtersReducer(initialState, setCategory({category: "category"}));
    expect(state.category).toBe("category");
  });

  it('should return state with new order', () => {
    const state = filtersReducer(initialState, setOrder({order: "order"}));
    expect(state.order).toBe("order");
  });

  it('should return state with new search', () => {
    const state = filtersReducer(initialState, setSearch({search: "search"}));
    expect(state.search).toBe("search");
  });
});
