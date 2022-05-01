import {categorySelector, filteredArticlesSelector, orderSelector, searchSelector} from "../filters";

const filtersState = {
  filteredArticles: [
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
  category: "category",
  order: "asc",
  search: "search"
};

const state = {filters: filtersState};

describe('Filters selectors', () => {
  it('should return filtered articles', () => {
    const filteredArticles = filteredArticlesSelector(state);
    expect(filteredArticles).toEqual(filtersState.filteredArticles);
  });

  it('should return category', () => {
    const category = categorySelector(state);
    expect(category).toEqual(filtersState.category);
  });

  it('should return order', () => {
    const order = orderSelector(state);
    expect(order).toEqual(filtersState.order);
  });

  it('should return search', () => {
    const search = searchSelector(state);
    expect(search).toEqual(filtersState.search);
  });
});
