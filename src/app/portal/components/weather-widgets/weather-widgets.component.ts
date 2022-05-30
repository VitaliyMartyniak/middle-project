import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {setWeatherLocations} from "../../../store/actions/weathers";
import {userSelector} from "../../../store/selectors/auth";
import {LocationCoordinates, UserData} from "../../../shared/interfaces";
import {weatherLocationsSelector} from "../../../store/selectors/weathers";

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

  constructor(private weatherService: WeatherService, private store: Store) {}

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
    const weatherLocations = localStorage.getItem('weatherLocations');
    if (weatherLocations) {
      this.store.dispatch(setWeatherLocations({weatherLocations: JSON.parse(weatherLocations)}));
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.weatherLocationsSub.unsubscribe();
  }

}
