import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {UserData} from "../../../shared/interfaces";
import {catchError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";

@Component({
  selector: 'app-auth-alternative',
  templateUrl: './auth-alternative.component.html',
  styleUrls: ['./auth-alternative.component.scss']
})
export class AuthAlternativeComponent {

  constructor(private authService: AuthService, private store: Store, private router: Router) { }

  loginByGoogle(): void {
    this.authService.googleLogin().pipe(
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe(response => {
      this.processUser(response);
    })
  }

  loginByFacebook(): void {
    this.authService.facebookLogin().pipe(
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe(response => {
      this.processUser(response);
    });
  }

  processUser(response: any): void {
    const clonedResponse = JSON.parse(JSON.stringify(response));
    const usersData: UserData = {
      name: clonedResponse.user.displayName,
      photoUrl: clonedResponse.user.photoURL,
      uid: clonedResponse.user.uid,
      registrationType: clonedResponse.providerId,
    }
    localStorage.setItem('alternativeUser', JSON.stringify(usersData));
    this.authService.setToken(+clonedResponse._tokenResponse.expiresIn, clonedResponse._tokenResponse.idToken);
    this.router.navigate(['portal', 'dashboard']);
  }
}
