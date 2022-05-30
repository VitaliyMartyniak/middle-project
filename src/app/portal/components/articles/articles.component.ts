import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article, UserData} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {paginatedArticlesSelector} from "../../../store/selectors/pagination";
import {articlesLoadingSelector} from "../../../store/selectors/articles";
import {userSelector} from "../../../store/selectors/auth";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  isLoading = false;
  user: UserData;
  articles: Article[];
  usersSub: Subscription;
  isLoadingSub: Subscription;
  articlesSub: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.usersSub = this.store.select(userSelector).subscribe((user: UserData | null): void => {
      if (user) {
        this.user = user;
      }
    });
    this.isLoadingSub = this.store.select(articlesLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
    });
    this.articlesSub = this.store.select(paginatedArticlesSelector).subscribe((articles: Article[]): void => {
      this.articles = articles;
    })
  }

  ngOnDestroy(): void {
    this.articlesSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
    this.usersSub.unsubscribe();
  }
}
