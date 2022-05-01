import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('FiltersService', () => {
  let service: FiltersService;
  let store: MockStore<any>;

  const articlesMock = [
    {
      photo: "string",
      category: "media",
      date: 1,
      title: "title",
      text: "string",
      authorName: "string",
      authorUID: "string",
    },
    {
      photo: "string2",
      category: "media",
      date: 2,
      title: "title2",
      text: "string2",
      authorName: "string2",
      authorUID: "string2",
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            articles: {
              articles: articlesMock
            },
            filters: {
              order: 'asc',
              category: 'media',
              search: '',
            }
          }
        }),
      ]
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not init once more if subscriptions already created', () => {
    const method = spyOn(service, 'filterArticles');
    // @ts-ignore
    service.isInit = true;
    service.init();
    expect(method).toHaveBeenCalledTimes(0);
  });

  it('should update variables from store', () => {
    service.init();
    // @ts-ignore
    expect(service.articles).toEqual(articlesMock);
  });

  it('should filter articles by asc time order', () => {
    // @ts-ignore
    service.order = "asc";
    // @ts-ignore
    service.filteredArticles = articlesMock;
    // @ts-ignore
    service.filterByOrder();
    // @ts-ignore
    expect(service.filteredArticles).toEqual([
      {
        photo: "string2",
        category: "media",
        date: 2,
        title: "title2",
        text: "string2",
        authorName: "string2",
        authorUID: "string2",
      },
      {
        photo: "string",
        category: "media",
        date: 1,
        title: "title",
        text: "string",
        authorName: "string",
        authorUID: "string",
      },
    ]);
  });

  it('should filter articles by desc time order', () => {
    // @ts-ignore
    service.order = "desc";
    // @ts-ignore
    service.filteredArticles = articlesMock;
    // @ts-ignore
    service.filterByOrder();
    // @ts-ignore
    expect(service.filteredArticles).toEqual(articlesMock);
  });

  it('should filter articles by asc time order', () => {
    // @ts-ignore
    service.order = "asc";
    // @ts-ignore
    service.filteredArticles = articlesMock;
    // @ts-ignore
    service.filterByOrder();
    // @ts-ignore
    expect(service.filteredArticles).toEqual([
      {
        photo: "string2",
        category: "media",
        date: 2,
        title: "title2",
        text: "string2",
        authorName: "string2",
        authorUID: "string2",
      },
      {
        photo: "string",
        category: "media",
        date: 1,
        title: "title",
        text: "string",
        authorName: "string",
        authorUID: "string",
      },
    ]);
  });

  it('should filter articles by desc time order', () => {
    // @ts-ignore
    service.category = "business";
    // @ts-ignore
    service.filteredArticles = [
      ...articlesMock,
      {
        photo: "string2",
        category: "business",
        date: 2,
        title: "title2",
        text: "string2",
        authorName: "string2",
        authorUID: "string2",
      }
    ];
    // @ts-ignore
    service.filterByCategory();
    // @ts-ignore
    expect(service.filteredArticles).toEqual([
      {
        photo: "string2",
        category: "business",
        date: 2,
        title: "title2",
        text: "string2",
        authorName: "string2",
        authorUID: "string2",
      }
    ]);
  });
});
