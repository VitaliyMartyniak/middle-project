import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WeatherService} from "../../services/weather.service";
import {catchError, finalize, mergeMap, Observable} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {select, Store} from "@ngrx/store";
import {LocationCoordinates, UserData} from "../../../shared/interfaces";
import {addNewWeatherLocation, setWeathersLoading} from "../../../store/actions/weathers";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {weathersLoadingSelector} from "../../../store/selectors/weathers";

@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss']
})
export class LocationSearchModalComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean> = this.store.pipe(select(weathersLoadingSelector));

  constructor(private weatherService: WeatherService, private store: Store, private dialogRef: MatDialogRef<LocationSearchModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { userUID: string }) { }

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
      mergeMap((response: any): Observable<string> => {
        coordinates = {
          lat: response[0].lat,
          lon: response[0].lon,
          uid: this.data.userUID,
        };
        return this.weatherService.addNewWeather(coordinates);
      }),
      mergeMap((docID: string) => {
        return this.weatherService.saveDocumentID(docID)
      }),
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setWeathersLoading({isLoading: false}));
      }),
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe((): void => {
      this.store.dispatch(addNewWeatherLocation({weatherLocation: coordinates}));
      this.dialogRef.close();
    });
  }
}
