import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, from, mergeMap, Observable, of, ReplaySubject, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, getDocs, getFirestore} from "@angular/fire/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut, sendPasswordResetEmail
} from "@angular/fire/auth";

@Injectable()
export class AuthService {
  private auth2: gapi.auth2.GoogleAuth
  private googleAuthSubject$ = new ReplaySubject<gapi.auth2.GoogleUser | null>(1)
  private auth = getAuth();
  private db = getFirestore();
  private usersDataRef = collection(this.db, 'usersData');
  user = null;

  constructor(private http: HttpClient, private fireStore: AngularFirestore) {
    // gapi.load('auth2', () => {
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '981490114024-82qs2lqct5hojkc8f85isam986uvesek.apps.googleusercontent.com'
    //   })
    // })
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
    // const db = getFirestore();
    // const colRef = collection(db, 'usersData');
    // getDocs(colRef).then((snapshot) => console.log(snapshot.docs[0].data()));
    // console.log(this.fireStore.collection('usersData'));
    // loginData.returnSecureToken = true;
    // return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, loginData)
    //   .pipe(
    //     tap(this.setToken),
    //     // catchError(this.handleError.bind(this))
    //   )
    return from(signInWithEmailAndPassword(this.auth, loginData.email, loginData.password).then(r => {
      return r;
    }));
  }

  signUpUser(signUpData: any): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, signUpData.email, signUpData.password).then(r => {
        return r;
    }));
    // signUpData.returnSecureToken = true;
    // return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, signUpData)
    //   .pipe(
    //     tap(this.setToken),
    //     // catchError(this.handleError.bind(this))
    //   )
  }

  setAdditionalData(userData: any) {
    return from(addDoc(this.usersDataRef, userData).then(r => r));
    // return this.http.post<any>(`${environment.fbDBUrl}/usersData/${userId}.json`, userData);
  }

  getAdditionalData(userId: string) {
    return this.http.get<any>(`${environment.fbDBUrl}/usersData/${userId}.json`);
  }

  forgotPasswordRequest(email: any): Observable<any> {
    console.log(email, 'forgotPasswordData');
    return from(sendPasswordResetEmail(this.auth, email).then(r => {
      return r;
    }));
    // forgotPasswordData.requestType = 'PASSWORD_RESET';
    // return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`, forgotPasswordData)
  }

  logout() {
    return from(signOut(this.auth).then(r => {
      return r;
    }));
    // this.setToken(null);
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
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).then(r => console.log(r));
    // this.auth2.signIn({
    //   //
    //   scope: 'https://www.googleapis.com/auth/gmail.readonly'
    // }).then( user => {
    //   this.googleAuthSubject$.next(user);
    // }).catch(() => {
    //   this.googleAuthSubject$.next(null);
    // })
  }

  // googleLogout() {
  //   this.auth2.signOut()
  //     .then(() => {
  //       this.googleAuthSubject$.next(null);
  //     })
  // }
  //
  // googleAuthObservable(): Observable<gapi.auth2.GoogleUser | null> {
  //   return this.googleAuthSubject$.asObservable();
  // }

  facebookLogin() {
    console.log('facebookLogin');
    const provider = new FacebookAuthProvider();
    signInWithPopup(this.auth, provider).then(r => console.log(r));
  }
}
