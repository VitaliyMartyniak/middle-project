import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, UserData} from "../../../shared/interfaces";
import {userSelector} from "../../../store/selectors/auth";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {PortalService} from "../../services/portal.service";
import {addNewArticle, updateArticle} from "../../../store/actions/articles";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {articlesSelector} from "../../../store/selectors/articles";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent {
  form: FormGroup;
  private userSub: Subscription;
  private articlesSub: Subscription;
  user: UserData;
  mode: string;
  docID: string;
  // article: Article | undefined;

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
    this.route.queryParams.subscribe((params: Params) => {
      if (params['docID']) {
        this.articlesSub = this.store.select(articlesSelector).subscribe((articles: Article[]): void => {
          this.docID = params['docID'];
          const article = articles.find(article => article.docID === this.docID);
          console.log('article', article);
          if (article) {
            this.form.patchValue({title: article.title});
            this.form.patchValue({text: article.text});
            this.form.patchValue({category: article.category});
            this.form.patchValue({photo: article.photo});
          }
        });
      }
    });
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
    });
  }

  updateFile(base64File: string) {
    this.form.patchValue({photo: base64File});
    this.form.get('photo')?.markAsTouched();
  }

  submit() {
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
      authorName: `${this.user.name} ${this.user.lastName}`,
    };
    this.portalService.addNewArticle(newArticle).subscribe(docID => {
      this.portalService.saveDocumentID(docID).subscribe(() => {
        const newArticleWithDocID = {
          ...newArticle,
          docID
        };
        this.store.dispatch(addNewArticle({article: newArticleWithDocID}));
        this.router.navigate(['portal', 'dashboard']);
      })
    });
  }

  updateArticleData(): void {
    const updatedArticleInfo = {...this.form.value};
    this.portalService.updateArticle(updatedArticleInfo, this.docID).subscribe(() => {
      this.store.dispatch(updateArticle({articleData: updatedArticleInfo, docID: this.docID}));
      this.router.navigate(['portal', 'dashboard']);
    });
  }
}
