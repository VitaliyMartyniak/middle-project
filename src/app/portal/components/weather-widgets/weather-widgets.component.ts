import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, Subscription} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {setWeatherLocations, setWeathersLoading} from "../../../store/actions/weathers";
import {userSelector} from "../../../store/selectors/auth";
import {LocationCoordinates, UserData} from "../../../shared/interfaces";
import {weatherLocationsSelector} from "../../../store/selectors/weathers";

@Component({
  selector: 'app-weather-widgets',
  templateUrl: './weather-widgets.component.html',
  styleUrls: ['./weather-widgets.component.scss']
})
export class WeatherWidgetsComponent implements OnInit, OnDestroy {
  getWeatherLocationsSub: Subscription;
  weatherLocationsSub: Subscription;
  weatherLocations: LocationCoordinates[] = [];
  private userSub: Subscription; //todo mb refactor and replace higher
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
    this.getWeatherLocationsSub = this.weatherService.getWeatherLocations(this.user.uid).pipe(
      finalize((): void => {
        this.store.dispatch(setWeathersLoading({isLoading: false}));
      }),
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe((weatherLocations: any) => {
      this.store.dispatch(setWeatherLocations({weatherLocations}));
    });
  }

  ngOnDestroy(): void {
    this.getWeatherLocationsSub.unsubscribe();
  }

}
