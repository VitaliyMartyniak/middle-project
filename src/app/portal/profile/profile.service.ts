import { Injectable } from '@angular/core';
import {getAuth, reauthenticateWithCredential, updatePassword} from "@angular/fire/auth";
import {from, Observable, of, throwError} from "rxjs";
import { EmailAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private auth = getAuth();

  constructor() { }

  checkOldPassword(oldPassword: string): Observable<void> {
    const user = this.auth.currentUser!;
    if (!user || !user.email) return throwError(() => new Error("error"))
    const credential = EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    return from(reauthenticateWithCredential(user, credential).then(() => undefined));
  }

  updatePassword(newPassword: string): Observable<void> {
    const user = this.auth.currentUser!;
    return from(updatePassword(user, newPassword).then(() => undefined));
  }
}
