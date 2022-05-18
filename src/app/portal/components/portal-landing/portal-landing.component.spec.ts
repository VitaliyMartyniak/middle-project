import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalLandingComponent } from './portal-landing.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {ArticleSearchComponent} from "../article-search/article-search.component";
import {PortalService} from "../../services/portal.service";
import {AuthService} from "../../../authentication/services/auth.service";
import {Component, NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {MatMenuModule} from "@angular/material/menu";
import {setArticles} from "../../../store/actions/articles";
import {setSnackbar} from "../../../store/actions/notifications";
import {DashboardComponent} from "../../views/dashboard/dashboard.component";
import {AddEditArticleComponent} from "../../views/add-edit-article/add-edit-article.component";
import {RouterTestingModule} from "@angular/router/testing";

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

  @Component({
    selector: 'mock-component',
    template: '<p>Mock Component</p>'
  })
  class MockComponent {}

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
      imports: [
        MatMenuModule,
        RouterTestingModule.withRoutes([
          {
            path: '', component: PortalLandingComponent, children: [
              {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
              {path: 'dashboard', component: DashboardComponent},
              {path: 'article', component: AddEditArticleComponent},
              {path: 'portal', component: MockComponent},
            ],
          },
          {path: '**', redirectTo: '/portal'},
        ]),
      ],
      declarations: [
        ArticleSearchComponent,
        PortalLandingComponent,
        DashboardComponent,
        AddEditArticleComponent,
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

  it('should navigate to login page when logout', () => {
    const method = spyOn(router, 'navigate');
    spyOn(authService, 'logout').and.returnValue(of(undefined));
    component.logout(event);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith([ 'login' ]);
  });

  it('should not navigate to login page when logout', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'logout').and.returnValue(throwError(() => new Error("error")));
    component.logout(event);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
