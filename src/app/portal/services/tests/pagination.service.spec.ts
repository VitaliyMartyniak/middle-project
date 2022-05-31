import { TestBed } from '@angular/core/testing';

import { PaginationService } from '../pagination.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('PaginationService', () => {
  let service: PaginationService;
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
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            filters: {
              filteredArticles: articlesMock
            },
            pagination: {
              pageIndex: 1
            }
          }
        })
      ]
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not init once more if subscriptions already created', () => {
    const method = spyOn(service, 'setPaginatedArticles');
    // @ts-ignore
    service.isInit = true;
    service.init();
    expect(method).toHaveBeenCalledTimes(0);
  });
});
