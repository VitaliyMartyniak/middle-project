import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-read-more-article-modal',
  templateUrl: './read-more-article-modal.component.html',
  styleUrls: ['./read-more-article-modal.component.scss']
})
export class ReadMoreArticleModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public article: any) {}

  ngOnInit(): void {
  }

}
