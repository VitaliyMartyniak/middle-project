import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where} from "@angular/fire/firestore";
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

@Injectable()
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  private usersDataRef = collection(this.db, 'usersData');

  constructor(private fireStore: AngularFirestore, private store: Store) {
  }

  login(loginData: any): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, loginData.email, loginData.password).then(r => {
      return r;
    }));
  }

  autoLogin() {
    const userID = localStorage.getItem('userID');
    const alternativeUser = localStorage.getItem('alternativeUser');
    if (userID) {
      this.getAdditionalData(userID).subscribe(user => {
        this.store.dispatch(setUser({user}));
      })
    } else if (alternativeUser) {
      this.store.dispatch(setUser({user: JSON.parse(alternativeUser)}));
    }
  }

  signUpUser(signUpData: any): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, signUpData.email, signUpData.password).then(r => {
        return r;
    }));
  }

  setAdditionalData(userData: any) {
    return from(addDoc(this.usersDataRef, userData).then(r => r.id));
  }

  saveDocumentID(id: string) {
    const docRef = doc(this.db, 'usersData', id);
    return from(updateDoc(docRef, {
      docID: id
    }).then(r => r));
  }

  updateUserProfileInfo(usersData: any, id: string) {
    const docRef = doc(this.db, 'usersData', id);
    console.log('usersData', usersData);
    return from(updateDoc(docRef, usersData).then(r => r));
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
      localStorage.clear();
      return r;
    }));
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

  setToken(expiresIn: number, idToken: string) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('fb-token', idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
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
