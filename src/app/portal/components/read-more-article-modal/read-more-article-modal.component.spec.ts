import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreArticleModalComponent } from './read-more-article-modal.component';

describe('ReadMoreArticleModalComponent', () => {
  let component: ReadMoreArticleModalComponent;
  let fixture: ComponentFixture<ReadMoreArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMoreArticleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
