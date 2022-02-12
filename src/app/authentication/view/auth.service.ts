import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, getDocs, getFirestore, query, where} from "@angular/fire/firestore";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "@angular/fire/auth";

@Injectable()
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  private usersDataRef = collection(this.db, 'usersData');

  constructor(private fireStore: AngularFirestore) {
  }

  get token(): string | null {
    const fbTokenExp = localStorage.getItem('fb-token-exp');
    const expDate = fbTokenExp ? new Date(fbTokenExp) : null;
    if(!expDate || new Date() > expDate) {
      this.logout();
      return null
    }
    return localStorage.getItem('fb-token');
  }

  login(loginData: any): Observable<any> {
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
  }

  getAdditionalData(userId: string): Observable<any> {
    const q = query(this.usersDataRef, where('uid', '==', userId));
    return from(getDocs(q).then(r => {
      return {...r.docs[0].data()};
    }));
  }

  forgotPasswordRequest(email: any): Observable<any> {
    return from(sendPasswordResetEmail(this.auth, email).then(r => {
      return r;
    }));
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
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  //Google sign in
  googleLogin() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider).then(r => r));
  }

  facebookLogin() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(this.auth, provider).then(r => console.log(r));
  }
}
