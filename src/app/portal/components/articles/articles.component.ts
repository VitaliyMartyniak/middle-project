import {Component, OnInit} from '@angular/core';
import {Article} from "../../../shared/interfaces";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {PortalService} from "../../services/portal.service";
import {removeArticle} from "../../../store/actions/articles";
import {paginatedArticlesSelector} from "../../../store/selectors/pagination";
import {articlesLoadingSelector} from "../../../store/selectors/articles";
import {userSelector} from "../../../store/selectors/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {MatDialog} from "@angular/material/dialog";
import {ReadMoreArticleModalComponent} from "../read-more-article-modal/read-more-article-modal.component";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  isLoading = false;
  user: User;
  usersSub: Subscription;
  isLoadingSub: Subscription;
  articles$: Observable<Article[]> = this.store.pipe(select(paginatedArticlesSelector));

  constructor(private store: Store, private portalService: PortalService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usersSub = this.store.select(userSelector).subscribe((user: User): void => {
      this.user = user;
    })
    this.isLoadingSub = this.store.select(articlesLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
    })
  }

  deleteArticle(docID: string): void {
    this.portalService.deleteArticle(docID).subscribe(() => {
      this.store.dispatch(removeArticle({docID}));
    });
  }

  openModal(article: Article): void {
    this.dialog.open(ReadMoreArticleModalComponent, {
      data: {
        photo: article.photo,
        category: article.category,
        date: article.date,
        title: article.title,
        text: article.text,
        authorAvatar: article.authorAvatar,
        authorName: article.authorName,
      },
    });
  }
}
