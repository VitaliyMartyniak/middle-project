import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {of} from "rxjs";

describe('WeatherService', () => {
  let service: WeatherService;
  let http: HttpClient;

  // @ts-ignore
  const mock: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        WeatherService,
      ]
    });
    service = TestBed.inject(WeatherService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get coordinates', () => {
    spyOn(http, 'get').and.callFake(() => of(mock));
    service.getCoordinates("country", "city").subscribe((response) => {
      expect(response).toBe(mock);
    })
  });

  it('should get current weather', () => {
    spyOn(http, 'get').and.callFake(() => of(mock));
    service.getCurrentWeather(1, 1).subscribe((response) => {
      expect(response).toBe(mock);
    })
  });

  it('should get location', () => {
    spyOn(http, 'get').and.callFake(() => of(mock));
    service.getLocation(1, 1).subscribe((response) => {
      expect(response).toBe(mock);
    })
  });
});
