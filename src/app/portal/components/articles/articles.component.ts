import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article, UserData} from "../../../shared/interfaces";
import {catchError, finalize, of, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {paginatedArticlesSelector} from "../../../store/selectors/pagination";
import {articlesLoadingSelector} from "../../../store/selectors/articles";
import {userSelector} from "../../../store/selectors/auth";
import {setArticles, setArticlesLoading} from "../../../store/actions/articles";
import {setSnackbar} from "../../../store/actions/notifications";
import {PortalService} from "../../services/portal.service";

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

  constructor(private portalService: PortalService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(setArticlesLoading({isLoading: true}));
    this.portalService.getArticles().pipe(
      finalize((): void => {
        this.store.dispatch(setArticlesLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((articles: any) => {
      this.store.dispatch(setArticles({articles}));
    });
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
