import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadMoreArticleModalComponent } from './read-more-article-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";

describe('ReadMoreArticleModalComponent', () => {
  let component: ReadMoreArticleModalComponent;
  let fixture: ComponentFixture<ReadMoreArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatCardModule,
      ],
      declarations: [ ReadMoreArticleModalComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
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
