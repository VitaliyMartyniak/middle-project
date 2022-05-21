import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
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
import {setUser} from "../../store/actions/auth";
import {Store} from "@ngrx/store";
import firebase from "firebase/compat";
import {AuthResponse, OAuthResponse, Token, UserData} from "../../shared/interfaces";
import DocumentData = firebase.firestore.DocumentData;
import {setArticles} from "../../store/actions/articles";
import {setCategory, setOrder, setSearch} from "../../store/actions/filters";
import {setWeatherLocations} from "../../store/actions/weathers";

@Injectable()
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  private usersDataRef = collection(this.db, 'usersData');

  constructor(private fireStore: Firestore, private store: Store) {
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return from(signInWithEmailAndPassword(this.auth, email, password).then(r => {
      const clonedResponse = JSON.parse(JSON.stringify(r));
      return {
        uid: clonedResponse.user.uid,
        token: {
          expiresIn: +clonedResponse._tokenResponse.expiresIn,
          idToken: clonedResponse._tokenResponse.idToken
        },
      };
    }));
  }

  autoLogin(): void {
    const userID = localStorage.getItem('userID');
    const alternativeUser = localStorage.getItem('alternativeUser');
    if (userID) {
      this.getAdditionalData(userID).subscribe((user: any) => {
        this.store.dispatch(setUser({user}));
      })
    } else if (alternativeUser) {
      this.store.dispatch(setUser({user: JSON.parse(alternativeUser)}));
    }
  }

  signUpUser(email: string, password: string): Observable<AuthResponse> {
    return from(createUserWithEmailAndPassword(this.auth, email, password).then(r => {
      const clonedResponse = JSON.parse(JSON.stringify(r));
      return {
        uid: clonedResponse.user.uid,
        token: {
          expiresIn: +clonedResponse._tokenResponse.expiresIn,
          idToken: clonedResponse._tokenResponse.idToken
        },
      };
    }));
  }

  setAdditionalData(userData: DocumentData): Observable<string> {
    return from(addDoc(this.usersDataRef, userData).then(r => r.id));
  }

  saveDocumentID(id: string): Observable<void> {
    const docRef = doc(this.db, 'usersData', id);
    // @ts-ignore
    return from(updateDoc(docRef, {
      docID: id
    }).then(() => undefined));
  }

  updateUserProfileInfo(usersData: DocumentData, id: string): Observable<void> {
    const docRef = doc(this.db, 'usersData', id);
    return from(updateDoc(docRef, usersData).then(() => undefined));
  }

  getAdditionalData(userId: string): Observable<DocumentData> {
    const q = query(this.usersDataRef, where('uid', '==', userId));
    return from(getDocs(q).then(r => {
      return {...r.docs[0].data()};
    }));
  }

  forgotPasswordRequest(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email).then(() => undefined));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth).then(() => {
      this.clearStore();
      localStorage.clear();
      return undefined;
    }));
  }

  clearStore(): void {
    this.store.dispatch(setArticles({articles: []}));
    this.store.dispatch(setSearch({search: ''}));
    this.store.dispatch(setOrder({order: 'asc'}));
    this.store.dispatch(setCategory({category: 'All Categories'}));
    this.store.dispatch(setWeatherLocations({weatherLocations: []}))
  }

  isAuthenticated(): boolean {
    return !!this.token
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

  setToken(expiresIn: number, idToken: string): void {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('fb-token', idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
  }

  googleLogin(): Observable<OAuthResponse> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider).then(response => AuthService.processOAuthResponse(response)));
  }

  facebookLogin(): Observable<OAuthResponse> {
    const provider = new FacebookAuthProvider();
    return from(signInWithPopup(this.auth, provider).then(response => AuthService.processOAuthResponse(response)));
  }

  private static processOAuthResponse(response: any): OAuthResponse {
    const clonedResponse = JSON.parse(JSON.stringify(response));
    const user: UserData = {
      name: clonedResponse.user.displayName,
      photoUrl: clonedResponse.user.photoURL,
      uid: clonedResponse.user.uid,
      registrationType: clonedResponse.providerId,
    }
    const token: Token = {
      idToken: clonedResponse._tokenResponse.idToken,
      expiresIn: +clonedResponse._tokenResponse.expiresIn
    }
    return {
      user,
      token
    }
  }
}
