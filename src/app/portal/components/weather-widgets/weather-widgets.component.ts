import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, of, Subscription} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {setWeatherLocations, setWeathersLoading} from "../../../store/actions/weathers";
import {LocationCoordinates, UserData} from "../../../shared/interfaces";
import {weatherLocationsSelector} from "../../../store/selectors/weathers";
import {userSelector} from "../../../store/selectors/auth";

@Component({
  selector: 'app-weather-widgets',
  templateUrl: './weather-widgets.component.html',
  styleUrls: ['./weather-widgets.component.scss']
})
export class WeatherWidgetsComponent implements OnInit, OnDestroy {
  weatherLocationsSub: Subscription;
  weatherLocations: LocationCoordinates[] = [];
  userSub: Subscription;
  user: UserData;

  constructor(private weatherService: WeatherService, private store: Store) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: UserData | null): void => {
      if (user) {
        this.user = user;
        this.getWeatherLocations();
      }
    });
    this.weatherLocationsSub = this.store.select(weatherLocationsSelector).subscribe((weatherLocations: LocationCoordinates[]): void => {
      this.weatherLocations = weatherLocations;
    })
  }

  getWeatherLocations(): void {
    this.weatherService.getWeatherLocations(this.user.uid).pipe(
      finalize((): void => {
        this.store.dispatch(setWeathersLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((weatherLocations: any) => {
      this.store.dispatch(setWeatherLocations({weatherLocations}));
    });
  }

  ngOnDestroy(): void {
    this.weatherLocationsSub.unsubscribe();
  }

}
