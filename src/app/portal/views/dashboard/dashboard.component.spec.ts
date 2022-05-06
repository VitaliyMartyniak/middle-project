import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {FiltersComponent} from "../../components/filters/filters.component";
import {ArticlesComponent} from "../../components/articles/articles.component";
import {WeatherWidgetsComponent} from "../../components/weather-widgets/weather-widgets.component";
import {MatIconModule} from "@angular/material/icon";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";

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
        FiltersComponent,
        ArticlesComponent,
        WeatherWidgetsComponent
      ],
      providers: [
        provideMockStore(),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
