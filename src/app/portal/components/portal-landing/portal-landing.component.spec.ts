import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalLandingComponent } from './portal-landing.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {ArticleSearchComponent} from "../article-search/article-search.component";
import {PortalService} from "../../services/portal.service";
import {AuthService} from "../../../authentication/services/auth.service";
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {MatMenuModule} from "@angular/material/menu";
import {setArticles} from "../../../store/actions/articles";
import {setSnackbar} from "../../../store/actions/notifications";

describe('PortalLandingComponent', () => {
  let component: PortalLandingComponent;
  let fixture: ComponentFixture<PortalLandingComponent>;
  let portalService: PortalService;
  let authService: AuthService;
  let store: MockStore<any>;
  let router: Router;

  // @ts-ignore
  const event: Event = {
    preventDefault: () => {}
  };

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
        RouterTestingModule,
        MatMenuModule
      ],
      declarations: [
        ArticleSearchComponent,
        PortalLandingComponent,
      ],
      providers: [
        {
          provide: PortalService,
          useValue: {
            getArticles: () => of("value")
          }
        },
        {
          provide: AuthService,
          useValue: {
            logout: () => {}
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
              isLoading: false
            },
          }
        }),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    portalService = TestBed.inject(PortalService);
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PortalLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get articles from portal service', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'getArticles').and.callFake(() => of(articlesMock));
    component.ngOnInit();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setArticles({articles: articlesMock}));
  });

  it('should show error snackbar when getting articles', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'getArticles').and.callFake(() => throwError(() => new Error("error")));
    component.ngOnInit();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });

  it('should get articles from portal service', () => {
    const method = spyOn(router, 'navigate');
    spyOn(authService, 'logout').and.callFake(() => of(undefined));
    component.logout(event);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith([ 'login' ]);
  });
});
