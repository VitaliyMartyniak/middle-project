import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchModalComponent } from './location-search-modal.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {WeatherService} from "../../services/weather.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";

describe('LocationSearchModalComponent', () => {
  let component: LocationSearchModalComponent;
  let fixture: ComponentFixture<LocationSearchModalComponent>;
  let weatherService: WeatherService;
  let store: MockStore<any>;

  const locationMock = {
    lat: 1,
    lon: 2,
    id: 'id',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ LocationSearchModalComponent ],
      providers: [
        MatDialog,
        HttpClient,
        HttpHandler,
        MatDialogModule,
        { provide: WeatherService,
          useValue: {
            getCoordinates: () => {},
          }
        },
        provideMockStore(),
        { provide: MatDialogRef, useValue: {
            close: () => {},
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    weatherService = TestBed.inject(WeatherService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LocationSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new weather location to location from localstorage', () => {
    const method = spyOn(store, 'dispatch');
    localStorage.setItem('weatherLocations', JSON.stringify([locationMock]));
    spyOn(weatherService, 'getCoordinates').and.returnValue(of([{lat: 1, lon: 2}]));
    component.addNewWeather();
    expect(method).toHaveBeenCalled();
  });

  it('should add new weather location', () => {
    localStorage.clear();
    const method = spyOn(store, 'dispatch');
    spyOn(weatherService, 'getCoordinates').and.returnValue(of([{lat: 1, lon: 2}]));
    component.addNewWeather();
    expect(method).toHaveBeenCalled();
  });

  it('should show error snackbar', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(weatherService, 'getCoordinates').and.returnValue(throwError(() => new Error("error")));
    component.addNewWeather();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
