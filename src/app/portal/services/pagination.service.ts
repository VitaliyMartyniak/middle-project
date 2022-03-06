import { Injectable } from "@angular/core";
import {Store} from "@ngrx/store";
import * as _ from "lodash";
import {setPaginatedArticles, updatePage} from "../../store/actions/pagination";
import {pageIndexSelector} from "../../store/selectors/pagination";
import {Article} from "../../shared/interfaces";
import {articlesSelector} from "../../store/selectors/articles";

@Injectable({
  providedIn: "root"
})
export class PaginationService {
  private isInit = false;
  private filteredArticles: Article[] = [];
  private pageIndex = 0;

  constructor(private store: Store) {}

  init(): void {
    if (this.isInit) {
      return
    }

    // this.store.select(filteredProductsSelector).subscribe((articles: Article[]): void => {
    //   this.filteredArticles = articles;
    //   if (this.isInit) {
    //     this.store.dispatch(updatePage({pageIndex: 0}));
    //   }
    // });
    this.store.select(articlesSelector).subscribe((articles: Article[]): void => {
      this.filteredArticles = articles;
      if (this.isInit) {
        this.store.dispatch(updatePage({pageIndex: 0}));
      }
      this.setPaginatedArticles();
    });
    this.store.select(pageIndexSelector).subscribe((pageIndex: number): void => {
      this.pageIndex = pageIndex;
      if (this.isInit) {
        this.setPaginatedArticles();
      }
    });

    this.isInit = true;
  }

  setPaginatedArticles(filteredArticles: Article[] = this.filteredArticles): void {
    const articles = _.chunk(filteredArticles, 10)
    const paginatedArticles = articles[this.pageIndex];
    this.store.dispatch(setPaginatedArticles({paginatedArticles}));
  }
}
