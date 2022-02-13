import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getAuth, reauthenticateWithCredential} from "@angular/fire/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import AuthCredential = firebase.auth.AuthCredential;
import {debounceTime, from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private auth = getAuth();

  constructor(private fireStore: AngularFirestore) { }

  checkOldPassword(user: User, credential: AuthCredential) {
    return from(reauthenticateWithCredential(user, credential).then(r => r));
  }
}
