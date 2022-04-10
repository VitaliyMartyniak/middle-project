import { Component, OnInit } from '@angular/core';
import {catchError, finalize, Subscription} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {setWeathers, setWeathersLoading} from "../../../store/actions/weathers";
import {userSelector} from "../../../store/selectors/auth";
import {LocationCoordinates, UserData} from "../../../shared/interfaces";
import {weathersSelector} from "../../../store/selectors/weathers";

@Component({
  selector: 'app-weather-widgets',
  templateUrl: './weather-widgets.component.html',
  styleUrls: ['./weather-widgets.component.scss']
})
export class WeatherWidgetsComponent implements OnInit {
  getWeathersSub: Subscription;
  weathersSub: Subscription;
  weathers: LocationCoordinates[] = [];
  private userSub: Subscription; //todo mb refactor and replace higher
  user: any = null;

  constructor(private weatherService: WeatherService, private store: Store) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
      if (this.user) {
        this.getWeathers();
      }
    });
    this.weathersSub = this.store.select(weathersSelector).subscribe((weathers: LocationCoordinates[]): void => {
      this.weathers = weathers;
    })
  }

  getWeathers(): void {
    this.getWeathersSub = this.weatherService.getWeathers(this.user.uid).pipe(
      finalize((): void => {
        this.store.dispatch(setWeathersLoading({isLoading: false}));
      }),
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe((weathers: any) => {
      this.store.dispatch(setWeathers({weathers}));
    });
  }

}
