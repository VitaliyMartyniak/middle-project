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
import {removeWeatherLocation} from "../../../store/actions/weathers";
import {NetworkService} from "../../../shared/services/network.service";

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;
  let weatherService: WeatherService;
  let networkService: NetworkService;
  let store: MockStore<any>;
  let dialog: MatDialog;

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
            deleteWeather: () => {}
          }
        },
        NetworkService,
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
    dialog = TestBed.inject(MatDialog);
    store = TestBed.inject(MockStore);
    networkService = TestBed.inject(NetworkService);
    weatherService = TestBed.inject(WeatherService);
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    component.temp = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check locations when user back online', () => {
    const method = spyOn(component, 'checkLocations');
    networkService.networkStatus$.next('online');
    expect(method).toHaveBeenCalled();
  });

  it('should set loading weather with coordinates from component', () => {
    component.weatherLocation = {
      lat: 1,
      lon: 1
    }
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
    component.user = {
      name: "string",
      uid: "userUID",
      registrationType: "string",
    }
    const method = spyOn(dialog, 'open');
    component.openModal();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(LocationSearchModalComponent, {
      data: {
        userUID: 'userUID'
      },
    });
  });

  it('should remove weather location when deleteWidget', () => {
    component.weatherLocation = {
      lat: 1,
      lon: 1,
      docID: "docID"
    };
    const method = spyOn(store, 'dispatch');
    spyOn(weatherService, 'deleteWeather').and.returnValue(of(undefined));
    component.deleteWidget();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(removeWeatherLocation({docID: component.weatherLocation.docID!}))
  });

  it('should not remove weather location when deleteWidget', () => {
    component.weatherLocation = {
      lat: 1,
      lon: 1,
      docID: "docID"
    };
    const method = spyOn(store, 'dispatch');
    spyOn(weatherService, 'deleteWeather').and.returnValue(throwError(() => new Error("error")));
    component.deleteWidget();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });

});
