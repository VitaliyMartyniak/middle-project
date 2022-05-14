import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import {of, throwError} from "rxjs";
import {removeArticle} from "../../../store/actions/articles";
import {setSnackbar} from "../../../store/actions/notifications";
import {ReadMoreArticleModalComponent} from "../read-more-article-modal/read-more-article-modal.component";
import {PortalService} from "../../services/portal.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatMenuModule} from "@angular/material/menu";

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let store: MockStore<any>;
  let dialog: MatDialog;
  let portalService: PortalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatMenuModule,
      ],
      declarations: [ ArticleComponent ],
      providers: [
        provideMockStore(),
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
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    component.user = {
      name: "string",
      uid: "string",
      registrationType: "string",
    };
    component.article = {
      photo: "string",
      category: "string",
      date: 1,
      title: "string",
      text: "string",
      authorName: "string",
      authorUID: "string",
      authorAvatar: "string",
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete when deleteArticle', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(portalService, 'deleteArticle').and.returnValue(of(undefined));
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
    component.openModal();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(
      ReadMoreArticleModalComponent, {
        data: {
          photo: component.article.photo,
          category: component.article.category,
          date: component.article.date,
          title: component.article.title,
          text: component.article.text,
          authorAvatar: component.article.authorAvatar,
          authorName: component.article.authorName,
        },
      }
    );
  });
});
