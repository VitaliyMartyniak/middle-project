import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WeatherService} from "../../services/weather.service";
import {catchError, finalize, mergeMap, Observable, Subscription, tap} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {select, Store} from "@ngrx/store";
import {userSelector} from "../../../store/selectors/auth";
import {LocationCoordinates, UserData} from "../../../shared/interfaces";
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
  private userSub: Subscription; //todo mb refactor and replace higher
  user: UserData;
  docID: string;
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
    this.userSub = this.store.select(userSelector).subscribe((user: UserData | null): void => {
      if (user) {
        this.user = user;
      }
    });
  }

  addNewWeather() {
    this.store.dispatch(setWeathersLoading({isLoading: true}));
    const formData = {...this.form.value}
    let coordinates: LocationCoordinates;
    this.weatherService.getCoordinates(formData.country, formData.city).pipe(
      //todo LocationCoordinates замість any
      mergeMap((data: any): Observable<string> => {
        coordinates = {
          lat: data[0].lat,
          lon: data[0].lon,
          uid: this.user.uid,
        };
        return this.weatherService.addNewWeather(coordinates);
      }),
      mergeMap((docID: string) => {
        this.docID = docID;
        return this.weatherService.saveDocumentID(this.docID)
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
