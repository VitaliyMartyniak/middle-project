import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, UserData} from "../../../shared/interfaces";
import {userSelector} from "../../../store/selectors/auth";
import {catchError, finalize, mergeMap, Observable, of, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {PortalService} from "../../services/portal.service";
import {addNewArticle, setArticlesLoading, updateArticle} from "../../../store/actions/articles";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {articlesLoadingSelector, articlesSelector} from "../../../store/selectors/articles";
import {setSnackbar} from "../../../store/actions/notifications";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent {
  categories = ['PRODUCTIVITY', 'MEDIA', 'BUSINESS'];
  form: FormGroup;
  userSub: Subscription;
  routeSub: Subscription;
  isLoading$: Observable<boolean> = this.store.pipe(select(articlesLoadingSelector));
  user: UserData;
  mode: string;
  docID: string;

  constructor(private portalService: PortalService, private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl('', [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ]),
      photo: new FormControl('', [
        Validators.required,
      ]),
    });
    this.routeSub = this.route.queryParams.pipe(
      mergeMap((params: Params): Observable<Article[]> | Observable<undefined> => {
        if (params['docID']) {
          this.docID = params['docID'];
          return this.store.select(articlesSelector)
        }
        return of(undefined)
      })
    ).subscribe((articles: Article[] | undefined) => {
      if (articles) {
        const article = articles.find(article => article.docID === this.docID);
        if (article) {
          this.form.patchValue({title: article.title});
          this.form.patchValue({text: article.text});
          this.form.patchValue({category: article.category});
          this.form.patchValue({photo: article.photo});
        }
      }
    })
    this.userSub = this.store.select(userSelector).subscribe((user: UserData | null): void => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateFile(base64File: string): void {
    this.form.patchValue({photo: base64File});
    this.form.get('photo')?.markAsTouched();
  }

  submit(): void {
    this.store.dispatch(setArticlesLoading({isLoading: true}));
    if (this.docID) {
      this.updateArticleData();
    } else {
      this.createNewArticle();
    }
  }

  createNewArticle(): void {
    const formData = {...this.form.value};
    const newArticle: Article = {
      photo: formData.photo,
      category: formData.category,
      date: new Date().getTime(),
      title: formData.title,
      text: formData.text,
      authorAvatar: this.user.photoUrl ? this.user.photoUrl : null,
      authorName: `${this.user.name} ${this.user.lastName ? this.user.lastName : ''}`,
      authorUID: this.user.uid,
    };
    this.portalService.addNewArticle(newArticle).pipe(
      mergeMap((docId: string): Observable<void> => {
        this.docID = docId;
        return this.portalService.saveDocumentID(this.docID)
      }),
      finalize((): void => {
        this.store.dispatch(setArticlesLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      const newArticleWithDocID = {
        ...newArticle,
        docID: this.docID,
      };
      this.store.dispatch(addNewArticle({article: newArticleWithDocID}));
      this.router.navigate(['portal', 'dashboard']);
    });
  }

  updateArticleData(): void {
    const updatedArticleInfo = {...this.form.value};
    this.portalService.updateArticle(updatedArticleInfo, this.docID).pipe(
      finalize((): void => {
        this.store.dispatch(setArticlesLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      this.store.dispatch(updateArticle({articleData: updatedArticleInfo, docID: this.docID}));
      this.router.navigate(['portal', 'dashboard']);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
