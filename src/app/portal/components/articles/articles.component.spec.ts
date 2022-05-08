import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../shared/shared.module";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {PortalService} from "../../services/portal.service";
import {of, throwError} from "rxjs";
import {removeArticle} from "../../../store/actions/articles";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ReadMoreArticleModalComponent} from "../read-more-article-modal/read-more-article-modal.component";
import {setSnackbar} from "../../../store/actions/notifications";

describe('ArticlesComponent', () => {
  let portalService: PortalService;
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let store: MockStore<any>;
  let dialog: MatDialog;

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
        MatDialogModule,
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
                {
                  photo: "string",
                  category: "string",
                  date: 1,
                  title: "string",
                  text: "string",
                  authorName: "string",
                  authorUID: "string",
                }
              ]
            }
          }
        }),
        { provide: PortalService, useValue: {deleteArticle: () => {}} },
        { provide: MatDialog, useValue: { open: () => {}} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
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

  it('should delete when deleteArticle', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'deleteArticle').and.callFake(() => of(undefined));
    component.deleteArticle('docID');
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(removeArticle({docID: "docID"}));
  });

  it('should not delete when deleteArticle', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'deleteArticle').and.returnValue(throwError(() => new Error("error")));
    component.deleteArticle('docID');
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });

  it('should open ReadMoreArticleModalComponent when openModal', () => {
    const method = spyOn(dialog, 'open');
    component.openModal(mockedArticle);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(
      ReadMoreArticleModalComponent, {
        data: {
          photo: mockedArticle.photo,
          category: mockedArticle.category,
          date: mockedArticle.date,
          title: mockedArticle.title,
          text: mockedArticle.text,
          authorAvatar: mockedArticle.authorAvatar,
          authorName: mockedArticle.authorName,
        },
      }
    );
  });
});
