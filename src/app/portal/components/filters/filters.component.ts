import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {FiltersService} from "../../services/filters.service";
import {categorySelector, orderSelector} from "../../../store/selectors/filters";
import {setCategory, setOrder} from "../../../store/actions/filters";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  categories = ['All Categories', 'PRODUCTIVITY', 'MEDIA', 'BUSINESS'];
  category = '';
  orders = [
    {
      value: 'asc',
      viewValue: 'Ascending'
    },
    {
      value: 'desc',
      viewValue: 'Descending'
    },
  ];
  order = '';
  categorySub: Subscription;
  orderSub: Subscription;

  constructor(private store: Store, private filtersService: FiltersService) { }

  ngOnInit(): void {
    this.categorySub = this.store.select(categorySelector).subscribe((category: string): void => {
      this.category = category;
    });
    this.orderSub = this.store.select(orderSelector).subscribe((order: string): void => {
      this.order = order;
    });
    this.filtersService.init();
  }

  changeCategory(category: string) {
    this.store.dispatch(setCategory({category}));
    console.log('category', category);
  }

  changeOrder(order: string) {
    this.store.dispatch(setOrder({order}));
    console.log('order', order);
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.orderSub.unsubscribe();
  }
}
