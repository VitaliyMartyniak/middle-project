import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getCoordinates(country: string, city: string): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},,${country}&limit=1&appid=00643ccdad413631edbc5bda6b3c9439`);
  }

  getCurrentWeather(lon: number, lat: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=00643ccdad413631edbc5bda6b3c9439`);
  }

  getLocation(lon: number, lat: number): Observable<any> {
    return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
  }
}
