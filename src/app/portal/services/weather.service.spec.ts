import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {of} from "rxjs";

describe('WeatherService', () => {
  let service: WeatherService;
  let http: HttpClient;

  // @ts-ignore
  const mock: Blob = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        { provide: WeatherService, useValue: {
          getCoordinates: () => {}
        } }
      ]
    });
    service = TestBed.inject(WeatherService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should get coordinates', () => {
  //   spyOn(http, 'get').and.callFake(() => of(mock));
  //   service.getCoordinates("country", "city").subscribe((response) => {
  //     expect(response).toBe(mock);
  //   })
  // });
});
