import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {catchError, map, of} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {LocationSearchModalComponent} from "../location-search-modal/location-search-modal.component";
import {Location, LocationCoordinates} from "../../../shared/interfaces";
import {setWeatherLocations} from "../../../store/actions/weathers";

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weatherLocation: LocationCoordinates;
  @Input() hideMenu: boolean;
  @Input() baseWeather: boolean;

  isLoading = true;
  city: string;
  country: string;
  temp: number;
  currentDay = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weatherIcon: string;

  constructor(private weatherService: WeatherService, private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.weatherLocation) {
      this.load(this.weatherLocation.lon, this.weatherLocation.lat);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.load(longitude, latitude);
      });
    } else {
      // load default(Lviv) coordinates
      this.load(24.031111, 49.842957);
    }
  }

  load(longitude: number, latitude: number): void {
    this.weatherService.getLocation(longitude, latitude).pipe(
      map(response =>
          ({
            country: response.countryName,
            city: response.city,
          } as Location)
      ),
      catchError(() => {
        this.store.dispatch(setSnackbar({text: 'Error during getting location', snackbarType: 'error'}));
        this.isLoading = false;
        return of([]);
      }),
    ).subscribe((data: any) => {
      this.country = data.country;
      this.city = data.city;
    });
    this.weatherService.getCurrentWeather(longitude, latitude).pipe(
      catchError(() => {
        this.store.dispatch(setSnackbar({text: 'Error during getting weather', snackbarType: 'error'}));
        this.isLoading = false;
        return of([]);
      }),
    ).subscribe((response: any) => {
      const data = {...response};
      if (data.current) {
        this.temp = Math.round(data.current.temp);
        this.weatherIcon = data.current.weather[0].icon;
        this.isLoading = false;
      }
    });
  }

  openModal(): void {
    this.dialog.open(LocationSearchModalComponent);
  }

  deleteWidget(): void {
    const localeStorageString = localStorage.getItem('weatherLocations');
    const weatherLocations = JSON.parse(localeStorageString!);
    const updatedWeatherLocations = weatherLocations.filter((location: LocationCoordinates) => location.id !== this.weatherLocation.id)
    localStorage.setItem('weatherLocations', JSON.stringify(updatedWeatherLocations));
    this.store.dispatch(setWeatherLocations({weatherLocations: updatedWeatherLocations}));
  }
}
