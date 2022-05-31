import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {setWeatherLocations} from "../../../store/actions/weathers";
import {LocationCoordinates} from "../../../shared/interfaces";
import {weatherLocationsSelector} from "../../../store/selectors/weathers";

@Component({
  selector: 'app-weather-widgets',
  templateUrl: './weather-widgets.component.html',
  styleUrls: ['./weather-widgets.component.scss']
})
export class WeatherWidgetsComponent implements OnInit, OnDestroy {
  weatherLocationsSub: Subscription;
  weatherLocations: LocationCoordinates[] = [];

  constructor(private weatherService: WeatherService, private store: Store) {}

  ngOnInit(): void {
    this.getWeatherLocations();
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
    this.weatherLocationsSub.unsubscribe();
  }

}
