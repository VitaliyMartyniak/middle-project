import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {searchSelector} from "../../../store/selectors/filters";
import {debounceInput} from "../../../store/actions/filters";

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent {
  search$: Observable<string> = this.store.pipe(select(searchSelector));

  constructor(private store: Store) { }

  searchArticles(search: string): void {
    this.store.dispatch(debounceInput({value: search}));
  }
}
