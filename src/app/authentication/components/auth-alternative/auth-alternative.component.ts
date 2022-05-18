import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {OAuthResponse} from "../../../shared/interfaces";
import {catchError, of} from "rxjs";
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
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((response: any) => {
      this.processUser(response);
    })
  }

  loginByFacebook(): void {
    this.authService.facebookLogin().pipe(
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((response: any) => {
      this.processUser(response);
    });
  }

  processUser(response: OAuthResponse): void {
    localStorage.setItem('alternativeUser', JSON.stringify(response.user));
    if (response.token) {
      this.authService.setToken(response.token.expiresIn, response.token.idToken);
    }
    this.router.navigate(['portal', 'dashboard']);
  }
}
