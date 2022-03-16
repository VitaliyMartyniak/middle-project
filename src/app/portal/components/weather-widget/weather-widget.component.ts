import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  isLoading = true;
  city: string;
  country: string;
  temp: number
  currentDay = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weatherIcon: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    if (navigator.geolocation) {
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
    this.weatherService.getLocation(longitude, latitude).subscribe((data: any) => {
      this.country = data.countryName;
      this.city = data.city;
    });
    this.weatherService.getCurrentWeather(longitude, latitude).subscribe((data: any) => {
      this.temp = Math.round(data.current.temp);
      this.weatherIcon = data.current.weather[0].icon;
      this.isLoading = false;
    });
  }
}
