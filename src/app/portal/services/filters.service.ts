import { Injectable } from '@angular/core';
import {PaginationService} from "./pagination.service";
import {Store} from "@ngrx/store";
import {Article} from "../../shared/interfaces";
import {articlesSelector} from "../../store/selectors/articles";
import {categorySelector, orderSelector, searchSelector} from "../../store/selectors/filters";
import {setFilteredArticles} from "../../store/actions/filters";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private isInit = false;
  private order: string = '';
  private category = '';
  private search = '';
  private articles: Article[] = [];
  private filteredArticles: Article[] = [];

  constructor(private store: Store, private paginationService: PaginationService) {}

  init(): void {
    if (this.isInit) {
      return
    }

    this.store.select(articlesSelector).subscribe((articles: Article[]): void => {
      this.articles = articles;
      this.filterArticles();
    });
    this.store.select(orderSelector).subscribe((order: string): void => {
      this.order = order;
      if (this.isInit) {
        this.filterArticles();
      }
    });
    this.store.select(categorySelector).subscribe((category: string): void => {
      this.category = category;
      if (this.isInit) {
        this.filterArticles();
      }
    });
    this.store.select(searchSelector).subscribe((search: string): void => {
      this.search = search;
      if (this.isInit) {
        this.filterArticles();
      }
    });

    this.isInit = true;
  }

  filterArticles(): void {
    this.filteredArticles = [...this.articles];
    this.filterBySearch();
    this.filterByCategory();
    this.filterByOrder();
    this.store.dispatch(setFilteredArticles({filteredArticles: this.filteredArticles}));
    this.paginationService.setPaginatedArticles(this.filteredArticles);
  }

  private filterByOrder(): void {
    if (this.order === 'desc') {
      this.filteredArticles = this.filteredArticles.sort((a, b) => +a.date - +b.date);
    } else if (this.order === 'asc') {
      this.filteredArticles = this.filteredArticles.sort((a, b) => +b.date - +a.date);
    }
  }

  private filterByCategory(): void {
    if (!this.category || this.category === 'All Categories') {
      return
    }
    this.filteredArticles = this.filteredArticles.filter((article: Article) => article.category === this.category)
  }

  private filterBySearch(): void {
    this.filteredArticles = this.filteredArticles.filter((article: Article) => article.title.toLowerCase().includes(this.search.toLowerCase()))
  }
}
