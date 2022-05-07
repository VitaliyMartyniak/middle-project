import { ComponentFixture, TestBed } from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {MatIconModule} from "@angular/material/icon";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [
        DashboardComponent,
      ],
      providers: [
        provideMockStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
