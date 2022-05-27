import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../shared/shared.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {PortalService} from "../../services/portal.service";
import {of, throwError} from "rxjs";
import {setArticles} from "../../../store/actions/articles";
import {setSnackbar} from "../../../store/actions/notifications";

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let portalService: PortalService;
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
        {
          provide: PortalService,
          useValue: {
            getArticles: () => of("value")
          }
        },
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
    portalService = TestBed.inject(PortalService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    component.articles = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get articles from portal service', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'getArticles').and.returnValue(of(articlesMock));
    component.ngOnInit();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setArticles({articles: articlesMock}));
  });

  it('should show error snackbar when getting articles', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'getArticles').and.returnValue(throwError(() => new Error("error")));
    component.ngOnInit();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
