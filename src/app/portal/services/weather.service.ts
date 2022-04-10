import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {LocationCoordinates} from "../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private db = getFirestore();
  private weathersRef = collection(this.db, 'weathers');

  constructor(private http: HttpClient) { }

  getWeathers(userId: string): Observable<LocationCoordinates[]> {
    const q = query(this.weathersRef, where('uid', '==', userId));
    return from(getDocs(q).then(r => {
      let weathers: any[] = [];
      r.docs.forEach((doc) => {
        weathers.push({ ...doc.data() })
      })
      return weathers
    }));
  }

  addNewWeather(newWeather: any): Observable<any> {
    return from(addDoc(this.weathersRef, newWeather).then(r => r.id));
  }

  deleteWeather(id: string): Observable<void> {
    const docRef = doc(this.db, 'weathers', id);
    return from(deleteDoc(docRef).then(() => undefined));
  }

  saveDocumentID(id: string): Observable<void> {
    const docRef = doc(this.db, 'weathers', id);
    return from(updateDoc(docRef, {
      docID: id
    }).then(() => undefined));
  }

  getCoordinates(country: string, city: string) {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},,${country}&limit=1&appid=00643ccdad413631edbc5bda6b3c9439`)
  }

  getCurrentWeather(lon: number, lat: number) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=00643ccdad413631edbc5bda6b3c9439`)
  }

  getLocation(lon: number, lat: number) {
    return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
  }
}
