import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(lon: number, lat: number) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=00643ccdad413631edbc5bda6b3c9439`)
  }

  getLocation(lon: number, lat: number) {
    // return this.http.get(`http://api.ipstack.com/46.219.133.94?access_key=f7ada47f66c74ebc2f30e6e9fe5b5068`);
    // return this.http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true`);
    return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
  }
}
