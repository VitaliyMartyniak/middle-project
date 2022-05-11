import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {reauthenticateWithCredential, updatePassword} from "@angular/fire/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {from, Observable} from "rxjs";
import {Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private fireStore: Firestore) { }

  checkOldPassword(user: any, credential: firebase.auth.AuthCredential): Observable<void> {
    return from(reauthenticateWithCredential(user, credential).then(() => undefined));
  }

  updatePassword(user: any, newPassword: string): Observable<void> {
    return from(updatePassword(user, newPassword).then(() => undefined));
  }
}
