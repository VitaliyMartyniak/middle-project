import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {reauthenticateWithCredential, updatePassword} from "@angular/fire/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private fireStore: AngularFirestore) { }

  checkOldPassword(user: User, credential: firebase.auth.AuthCredential): Observable<void> {
    return from(reauthenticateWithCredential(user, credential).then(() => undefined));
  }

  updatePassword(user: User, newPassword: string): Observable<void> {
    return from(updatePassword(user, newPassword).then(() => undefined));
  }
}
