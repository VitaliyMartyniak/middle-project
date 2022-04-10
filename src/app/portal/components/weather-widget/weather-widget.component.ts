import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {LocationSearchModalComponent} from "../location-search-modal/location-search-modal.component";
import {LocationCoordinates} from "../../../shared/interfaces";
import {removeWeather} from "../../../store/actions/weathers";

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weather: LocationCoordinates;
  @Input() hideMenu: boolean;
  @Input() baseWeather: boolean;

  isLoading = true;
  city: string;
  country: string;
  temp: number
  currentDay = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weatherIcon: string;

  constructor(private weatherService: WeatherService, private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.weather) {
      this.load(this.weather.lon, this.weather.lat);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.load(longitude, latitude);
      });
    } else {
      this.load(24.031111, 49.842957);
    }
  }

  load(longitude: number, latitude: number) {
    this.weatherService.getLocation(longitude, latitude).pipe(
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: 'Error during getting location', snackbarType: 'error'}));
        this.isLoading = false;
      }),
    ).subscribe((data: any) => {
      this.country = data.countryName;
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

  openModal() {
    this.dialog.open(LocationSearchModalComponent);
  }

  deleteWidget() {
    this.isLoading = true;
    this.weatherService.deleteWeather(this.weather.docID!).subscribe(() => {
      this.isLoading = false;
      this.store.dispatch(removeWeather({docID: this.weather.docID!}));
    });
  }
}
