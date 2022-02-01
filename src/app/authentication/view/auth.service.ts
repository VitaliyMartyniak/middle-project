import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, mergeMap, Observable, ReplaySubject, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthService {
  private auth2: gapi.auth2.GoogleAuth
  private googleAuthSubject$ = new ReplaySubject<gapi.auth2.GoogleUser | null>(1)

  constructor(private http: HttpClient) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '981490114024-82qs2lqct5hojkc8f85isam986uvesek.apps.googleusercontent.com'
      })
    })
  }

  get token(): string | null {
    const fbTokenExp = localStorage.getItem('fb-token-exp');
    const expDate = fbTokenExp ? new Date(fbTokenExp) : null;
    if(!expDate || new Date() > expDate) {
      this.logout();
      return null
    }
    console.log('get token', localStorage.getItem('fb-token'));
    return localStorage.getItem('fb-token');
  }

  login(loginData: any): Observable<any> {
    loginData.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, loginData)
      .pipe(
        tap(this.setToken),
        // catchError(this.handleError.bind(this))
      )
  }

  signUpUser(signUpData: any): Observable<any> {
    signUpData.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, signUpData)
      .pipe(
        tap(this.setToken),
        // catchError(this.handleError.bind(this))
      )
  }

  setAdditionalData(userData: any, userId: string) {
    return this.http.post<any>(`${environment.fbDBUrl}/usersData/${userId}.json`, userData);
  }

  getAdditionalData(userId: string) {
    return this.http.get<any>(`${environment.fbDBUrl}/usersData/${userId}.json`);
  }

  forgotPasswordRequest(forgotPasswordData: any): Observable<any> {
    forgotPasswordData.requestType = 'PASSWORD_RESET';
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, forgotPasswordData)
  }

  logout() {
    console.log('logout');
    this.setToken(null);
  }

  // isAuthenticated(): boolean {
  //   return !!this.token
  // }

  // private handleError(error: HttpErrorResponse) {
  //   const {message} = error.error.error;
  //
  //   console.log(message);
  //
  //   return throwError(error)
  // }

  private setToken(response: any) {
    console.log('works', response);
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      console.log('response', response);
    } else {
      localStorage.clear();
    }
  }

  //Google sign in
  googleLogin() {
    console.log('works');
    this.auth2.signIn({
      //
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then( user => {
      this.googleAuthSubject$.next(user);
    }).catch(() => {
      this.googleAuthSubject$.next(null);
    })
  }

  googleLogout() {
    this.auth2.signOut()
      .then(() => {
        this.googleAuthSubject$.next(null);
      })
  }

  googleAuthObservable(): Observable<gapi.auth2.GoogleUser | null> {
    return this.googleAuthSubject$.asObservable();
  }
}
