import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, UserData} from "../../../shared/interfaces";
import {userSelector} from "../../../store/selectors/auth";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {PortalService} from "../../portal.service";
import {addNewArticle} from "../../../store/actions/articles";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent {
  form: FormGroup;
  private userSub: Subscription;
  user: UserData;

  constructor(private portalService: PortalService, private store: Store, private router: Router) {}

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
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
    });
  }

  updateFile(base64File: string) {
    this.form.patchValue({photo: base64File});
    this.form.get('photo')?.markAsTouched();
  }

  submit() {
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
}
