import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      declarations: [
        ArticlesComponent,
      ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user: {
                name: "string",
                uid: "string",
                registrationType: "string",
              },
            },
            articles: {
              isLoading: false
            },
            pagination: {
              paginatedArticles: articlesMock
            }
          }
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    component.articles = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
