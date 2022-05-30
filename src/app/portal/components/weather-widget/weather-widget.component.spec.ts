import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetComponent } from './weather-widget.component';
import {WeatherService} from "../../services/weather.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {LocationSearchModalComponent} from "../location-search-modal/location-search-modal.component";
import {setWeatherLocations} from "../../../store/actions/weathers";

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;
  let weatherService: WeatherService;
  let store: MockStore<any>;
  let dialog: MatDialog;

  const weatherLocationMock = {
    lat: 1,
    lon: 1,
    id: "docID"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WeatherWidgetComponent,
      ],
      providers: [
        provideMockStore(),
        { provide: WeatherService,
          useValue: {
            getLocation: () => of({countryName: "countryName", city: "city"}),
            getCurrentWeather: () => of('data'),
          }
        },
        MatDialog,
        Overlay,
        MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
        HttpClient,
        HttpHandler,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('weatherLocations', JSON.stringify([weatherLocationMock]));
    dialog = TestBed.inject(MatDialog);
    store = TestBed.inject(MockStore);
    weatherService = TestBed.inject(WeatherService);
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    component.temp = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading weather with coordinates from component', () => {
    component.weatherLocation = weatherLocationMock;
    const method = spyOn(component, 'load');
    component.ngOnInit();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(component.weatherLocation.lon, component.weatherLocation.lat);
  });

  it('should set weather country and city in component from getLocation when load', () => {
    spyOn(weatherService, 'getLocation').and.returnValue(of({countryName: "Ukraine", city: "Lviv"}));
    component.load(1,1);
    expect(component.country).toBe("Ukraine");
    expect(component.city).toBe("Lviv");
  });

  it('should not set weather country and city in component from getLocation when load', () => {
    spyOn(weatherService, 'getLocation').and.returnValue(throwError(() => new Error("error")));
    const method = spyOn(store, 'dispatch');
    component.load(1,1);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: 'Error during getting location', snackbarType: 'error'}));
  });

  it('should set temp in component from getCurrentWeather when load', () => {
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(of({current: {temp: 3, weather: [{icon: null}]}}));
    component.load(1,1);
    expect(component.temp).toBe(3);
  });

  it('should not set temp in component from getCurrentWeather when load', () => {
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(throwError(() => new Error("error")));
    const method = spyOn(store, 'dispatch');
    component.load(1,1);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: 'Error during getting weather', snackbarType: 'error'}));
  });

  it('should open LocationSearchModalComponent when openModal', () => {
    const method = spyOn(dialog, 'open');
    component.openModal();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(LocationSearchModalComponent);
  });

  it('should remove weather location when deleteWidget', () => {
    component.weatherLocation = weatherLocationMock;
    const method = spyOn(store, 'dispatch');
    component.deleteWidget();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setWeatherLocations({weatherLocations: []}))
  });

});
