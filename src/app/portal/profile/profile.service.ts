import { Injectable } from '@angular/core';
import {reauthenticateWithCredential, updatePassword} from "@angular/fire/auth";
import firebase from "firebase/compat";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  checkOldPassword(user: any, credential: firebase.auth.AuthCredential): Observable<void> {
    return from(reauthenticateWithCredential(user, credential).then(() => undefined));
  }

  updatePassword(user: any, newPassword: string): Observable<void> {
    return from(updatePassword(user, newPassword).then(() => undefined));
  }
}
