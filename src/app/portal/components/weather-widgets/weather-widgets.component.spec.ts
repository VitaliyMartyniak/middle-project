import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetsComponent } from './weather-widgets.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {WeatherService} from "../../services/weather.service";
import {of, throwError} from "rxjs";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {setSnackbar} from "../../../store/actions/notifications";
import {setWeatherLocations} from "../../../store/actions/weathers";

describe('WeatherWidgetsComponent', () => {
  let component: WeatherWidgetsComponent;
  let fixture: ComponentFixture<WeatherWidgetsComponent>;
  let weatherService: WeatherService;
  let store: MockStore<any>;

  const weatherLocationsMock = [
    {
      lat: 1,
      lon: 1,
      docID: "one"
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
            auth: {
              user: {
                name: "string",
                uid: "string",
                registrationType: "string",
              }
            },
            weathers: {
              weatherLocations: weatherLocationsMock
            }
          }
        }),
        { provide: WeatherService,
          useValue: {
            getWeatherLocations: () => of({}),
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    weatherService = TestBed.inject(WeatherService);
    fixture = TestBed.createComponent(WeatherWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get weather locations', () => {
    const method = spyOn(store, "dispatch");
    spyOn(weatherService, 'getWeatherLocations').and.returnValue(of(weatherLocationsMock));
    component.getWeatherLocations();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setWeatherLocations({weatherLocations: weatherLocationsMock}));
  });

  it('should not get weather locations', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(weatherService, 'getWeatherLocations').and.returnValue(throwError(() => new Error("error")));
    component.getWeatherLocations();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });

  it('should unsubscribe when ngOnDestroy', () => {
    const method = spyOn(component.weatherLocationsSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(method).toHaveBeenCalled();
  });
});
