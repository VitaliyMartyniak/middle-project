import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WeatherService} from "../../services/weather.service";
import {catchError, finalize, Observable, of} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {select, Store} from "@ngrx/store";
import {LocationCoordinates} from "../../../shared/interfaces";
import {addNewWeatherLocation, setWeathersLoading} from "../../../store/actions/weathers";
import {MatDialogRef} from "@angular/material/dialog";
import {weathersLoadingSelector} from "../../../store/selectors/weathers";

@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss']
})
export class LocationSearchModalComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean> = this.store.pipe(select(weathersLoadingSelector));

  constructor(private weatherService: WeatherService, private store: Store, private dialogRef: MatDialogRef<LocationSearchModalComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      country: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  addNewWeather(): void {
    this.store.dispatch(setWeathersLoading({isLoading: true}));
    const formData = {...this.form.value}
    let coordinates: LocationCoordinates;
    this.weatherService.getCoordinates(formData.country, formData.city).pipe(
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setWeathersLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((response: any): void => {
      if (!response[0]) return
      coordinates = {
        lat: response[0].lat,
        lon: response[0].lon,
        id: 'id' + (new Date()).getTime(),
      };
      let weatherLocations: LocationCoordinates[];
      const localeStorageString = localStorage.getItem('weatherLocations');
      if (localeStorageString) {
        weatherLocations = JSON.parse(localeStorageString);
        weatherLocations.push(coordinates);
      } else {
        weatherLocations = [coordinates];
      }
      localStorage.setItem('weatherLocations', JSON.stringify(weatherLocations));
      this.store.dispatch(addNewWeatherLocation({weatherLocation: coordinates}));
      this.dialogRef.close();
    });
  }
}
