import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchModalComponent } from './location-search-modal.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {WeatherService} from "../../services/weather.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";

describe('LocationSearchModalComponent', () => {
  let component: LocationSearchModalComponent;
  let fixture: ComponentFixture<LocationSearchModalComponent>;
  let weatherService: WeatherService;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ LocationSearchModalComponent ],
      providers: [
        MatDialog,
        HttpClient,
        HttpHandler,
        { provide: WeatherService,
          useValue: {
            getCoordinates: () => {},
            addNewWeather: () => {},
            saveDocumentID: () => {}
          }
        },
        provideMockStore({
          initialState: {
            auth: {
              user: {
                name: "string",
                uid: "string",
                registrationType: "string",
              },
            },
          }
        }),
        { provide: MatDialogRef, useValue: {
            close: () => {},
          }
        },
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

  it('should add new weather location', () => {
    spyOn(weatherService, 'getCoordinates').and.returnValue(of('data'));
    spyOn(weatherService, 'addNewWeather').and.returnValue(of("docID"));
    spyOn(weatherService, 'saveDocumentID').and.returnValue(of(undefined));
    component.addNewWeather();
    expect(weatherService.getCoordinates).toHaveBeenCalled();
    expect(weatherService.addNewWeather).toHaveBeenCalled();
    expect(weatherService.saveDocumentID).toHaveBeenCalled();
  });

  it('should show error snackbar', () => {
    const method = spyOn(store, 'dispatch');
    // @ts-ignore
    spyOn(weatherService, 'getCoordinates').and.returnValue(throwError(() => new Error("error")));
    component.addNewWeather();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
