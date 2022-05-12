import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {updatePage} from "../../../store/actions/pagination";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule
      ],
      declarations: [ PaginationComponent ],
      providers: [
        provideMockStore({
          initialState: {
            filters: {
              filteredArticles: []
            },
          }
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updatePage when handlePageEvent', () => {
    const method = spyOn(store, 'dispatch');
    component.handlePageEvent({length: 0, pageSize: 0, pageIndex: 1});
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(updatePage({pageIndex: 1}));
  });

  it('should unsubscribe when ngOnDestroy', () => {
    const filteredProductsSub = spyOn(component.filteredProductsSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(filteredProductsSub).toHaveBeenCalled();
  });
});
