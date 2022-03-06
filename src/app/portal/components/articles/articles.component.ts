import { Component, OnInit } from '@angular/core';
import {Article} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {articlesSelector} from "../../../store/selectors/articles";
import {PortalService} from "../../portal.service";
import {removeArticle, updateArticle} from "../../../store/actions/articles";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  articlesSub: Subscription;

  constructor(private store: Store, private portalService: PortalService) { }

  ngOnInit(): void {
    this.articlesSub = this.store.select(articlesSelector).subscribe((articles: Article[]): void => {
      this.articles = articles;
    })
  }

  deleteArticle(docID: string): void {
    this.portalService.deleteArticle(docID).subscribe(() => {
      this.store.dispatch(removeArticle({docID}));
    });
  }
}
