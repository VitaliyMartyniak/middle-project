import { Component, OnInit } from '@angular/core';
import {Article} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {articlesSelector} from "../../../store/selectors/articles";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  articlesSub: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.articlesSub = this.store.select(articlesSelector).subscribe((articles: Article[]): void => {
      this.articles = articles;
    })
  }

}
