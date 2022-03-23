import {Component, OnInit} from '@angular/core';
import {Article} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {PortalService} from "../../services/portal.service";
import {removeArticle} from "../../../store/actions/articles";
import {paginatedArticlesSelector} from "../../../store/selectors/pagination";
import {articlesLoadingSelector} from "../../../store/selectors/articles";
import {userSelector} from "../../../store/selectors/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  isLoading = false;
  user: User;
  usersSub: Subscription;
  articlesSub: Subscription;
  isLoadingSub: Subscription;

  constructor(private store: Store, private portalService: PortalService) { }

  ngOnInit(): void {
    this.articlesSub = this.store.select(paginatedArticlesSelector).subscribe((articles: Article[]): void => {
      if (articles) {
        this.articles = articles;
        console.log('article', this.articles[0]);
      }
    })
    this.usersSub = this.store.select(userSelector).subscribe((user: User): void => {
      this.user = user;
      console.log('user', this.user);
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
}
