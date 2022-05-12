import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {setCategory, setOrder} from "../../../store/actions/filters";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
      ],
      declarations: [ FiltersComponent ],
      providers: [
        provideMockStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setCategory when changeCategory', () => {
    const method = spyOn(store, 'dispatch');
    component.changeCategory('string');
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setCategory({category: "string"}));
  });

  it('should dispatch setOrder when changeOrder', () => {
    const method = spyOn(store, 'dispatch');
    component.changeOrder('string');
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setOrder({order: "string"}));
  });

  it('should unsubscribe when ngOnDestroy', () => {
    const categorySub = spyOn(component.categorySub, 'unsubscribe');
    const orderSub = spyOn(component.orderSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(orderSub).toHaveBeenCalled();
    expect(categorySub).toHaveBeenCalled();
  });
});
