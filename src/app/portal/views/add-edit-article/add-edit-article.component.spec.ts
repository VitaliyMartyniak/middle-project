import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditArticleComponent } from './add-edit-article.component';
import {of, Subject, throwError} from "rxjs";
import {PortalService} from "../../services/portal.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {setSnackbar} from "../../../store/actions/notifications";
import {HttpErrorResponse} from "@angular/common/http";

describe('AddEditArticleComponent', () => {
  let component: AddEditArticleComponent;
  let fixture: ComponentFixture<AddEditArticleComponent>;
  let store: MockStore<any>;
  let router: Router;
  let route: any;
  let portalService: PortalService;

  const error: HttpErrorResponse = new HttpErrorResponse({
    status: 400,
    statusText: 'Bad Request'
  })

  const routerStub = {
    navigate: () => {}
  }

  class activatedRouteStub {
    private subject = new Subject<any>()

    push(params: any) {
      this.subject.next(params)
    }

    get queryParams() {
      return this.subject.asObservable();
    }
  }

  const articlesMock = [
    {
      photo: "string",
      category: "media",
      date: 1,
      title: "title",
      text: "string",
      authorName: "string",
      authorUID: "string",
      docID: "id",
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditArticleComponent ],
      providers: [
        { provide: PortalService,
          useValue: {
            addNewArticle: () => of({}),
            saveDocumentID: () => of({}),
            updateArticle: () => of({}),
          }
        },
        provideMockStore({
          initialState: {
            articles: {
              articles: articlesMock
            },
            auth: {
              user: {
                name: "string",
                uid: "string",
                registrationType: "string",
              },
            },
          }
        }),
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useClass: activatedRouteStub },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    portalService = TestBed.inject(PortalService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route.push({docID: 'id'});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form with new photo', () => {
    const method = spyOn(component.form, "patchValue");
    component.updateFile("file");
    // @ts-ignore
    expect(method).toHaveBeenCalledWith({photo: "file"});
  });

  it('should update article on submit', () => {
    const method = spyOn(component, "updateArticleData");
    component.docID = "id";
    component.submit();
    expect(method).toHaveBeenCalled();
  });

  it('should create article on submit', () => {
    const method = spyOn(component, "createNewArticle");
    component.docID = "";
    component.submit();
    expect(method).toHaveBeenCalled();
  });

  // it('should dispatch create article on createNewArticle', () => {
  //   spyOn(portalService, 'addNewArticle').and.callFake(() => of("docID"));
  //   spyOn(portalService, 'saveDocumentID').and.callFake(() => of(undefined));
  //   const method = spyOn(store, "dispatch");
  //   component.createNewArticle();
  //   expect(method).toHaveBeenCalled();
  // });
  //
  // it('should not dispatch create article on createNewArticle', () => {
  //   spyOn(portalService, 'addNewArticle').and.returnValue(throwError(() => new Error("error")));
  //   const method = spyOn(store, "dispatch");
  //   component.createNewArticle();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  // });
  //
  // it('should dispatch update article on updateArticleData', () => {
  //   spyOn(portalService, 'updateArticle').and.callFake(() => of(undefined));
  //   const method = spyOn(store, "dispatch");
  //   component.updateArticleData();
  //   expect(method).toHaveBeenCalled();
  // });
  //
  // it('should not dispatch update article on updateArticleData', () => {
  //   spyOn(portalService, 'updateArticle').and.returnValue(throwError(() => new Error("error")));
  //   const method = spyOn(store, "dispatch");
  //   component.updateArticleData();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  // });
});
