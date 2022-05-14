import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let store: MockStore<any>;

  const mockedArticle = {
    photo: "string",
    category: "string",
    date: 1,
    title: "string",
    text: "string",
    authorName: "string",
    authorUID: "string",
    authorAvatar: "string",
  };

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
              paginatedArticles: [
                mockedArticle
              ]
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
