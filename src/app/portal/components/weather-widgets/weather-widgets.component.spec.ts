import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetsComponent } from './weather-widgets.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {setWeatherLocations} from "../../../store/actions/weathers";

describe('WeatherWidgetsComponent', () => {
  let component: WeatherWidgetsComponent;
  let fixture: ComponentFixture<WeatherWidgetsComponent>;
  let store: MockStore<any>;

  const weatherLocationsMock = [
    {
      lat: 1,
      lon: 1,
      id: "one"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherWidgetsComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        provideMockStore({
          initialState: {
            weathers: {
              weatherLocations: weatherLocationsMock
            }
          }
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('weatherLocations', JSON.stringify(weatherLocationsMock));
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(WeatherWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get weather locations', () => {
    const method = spyOn(store, "dispatch");
    component.getWeatherLocations();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setWeatherLocations({weatherLocations: weatherLocationsMock}));
  });

  it('should unsubscribe when ngOnDestroy', () => {
    const method = spyOn(component.weatherLocationsSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(method).toHaveBeenCalled();
  });
});
