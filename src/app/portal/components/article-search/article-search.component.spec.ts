import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSearchComponent } from './article-search.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {debounceInput} from "../../../store/actions/filters";

describe('ArticleSearchComponent', () => {
  let component: ArticleSearchComponent;
  let fixture: ComponentFixture<ArticleSearchComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ArticleSearchComponent,
      ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArticleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch debounceInput when searchArticles', () => {
    const method = spyOn(store, 'dispatch');
    component.searchArticles("string");
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(debounceInput({value: "string"}));
  });

});
