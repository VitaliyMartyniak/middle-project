import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {catchError, finalize, map} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {LocationSearchModalComponent} from "../location-search-modal/location-search-modal.component";
import {Location, LocationCoordinates} from "../../../shared/interfaces";
import {removeWeatherLocation} from "../../../store/actions/weathers";

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
      // load Lviv coordinates
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
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: 'Error during getting location', snackbarType: 'error'}));
        this.isLoading = false;
      }),
    ).subscribe((data: any) => {
      this.country = data.country;
      this.city = data.city;
    });
    this.weatherService.getCurrentWeather(longitude, latitude).pipe(
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: 'Error during getting weather', snackbarType: 'error'}));
        this.isLoading = false;
      }),
    ).subscribe((data: any) => {
      this.temp = Math.round(data.current.temp);
      this.weatherIcon = data.current.weather[0].icon;
      this.isLoading = false;
    });
  }

  openModal(): void {
    this.dialog.open(LocationSearchModalComponent);
  }

  deleteWidget(): void {
    this.isLoading = true;
    this.weatherService.deleteWeather(this.weatherLocation.docID!).pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe(() => {
      this.store.dispatch(removeWeatherLocation({docID: this.weatherLocation.docID!}));
    });
  }
}
