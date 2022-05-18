import {Component, Input, OnInit} from '@angular/core';
import {removeArticle, setArticlesLoading} from "../../../store/actions/articles";
import {catchError, finalize, of} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {Article, UserData} from "../../../shared/interfaces";
import {ReadMoreArticleModalComponent} from "../read-more-article-modal/read-more-article-modal.component";
import {PortalService} from "../../services/portal.service";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() user: UserData;

  constructor(private portalService: PortalService, private store: Store, public dialog: MatDialog) { }

  deleteArticle(docID: string): void {
    this.store.dispatch(setArticlesLoading({isLoading: true}));
    this.portalService.deleteArticle(docID).pipe(
      finalize(() => {
        this.store.dispatch(setArticlesLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      this.store.dispatch(removeArticle({docID}));
    });
  }

  openModal(): void {
    this.dialog.open(ReadMoreArticleModalComponent, {
      data: {
        photo: this.article.photo,
        category: this.article.category,
        date: this.article.date,
        title: this.article.title,
        text: this.article.text,
        authorAvatar: this.article.authorAvatar,
        authorName: this.article.authorName,
      },
    });
  }

}
