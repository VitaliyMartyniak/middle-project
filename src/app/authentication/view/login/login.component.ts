import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthResponse, Token} from "../../../shared/interfaces";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {setAuthLoading} from "../../../store/actions/auth";
import {Store} from "@ngrx/store";
import {catchError, finalize, mergeMap, Observable, of} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {CustomValidators} from "../../../shared/custom-validators/custom-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      // @ts-ignore
    }, CustomValidators.emailValidator);
  }

  loginByEmail(): void {
    const loginData = {...this.form.value};
    this.store.dispatch(setAuthLoading({isLoading: true}));
    let token: Token;
    this.authService.login(loginData.email, loginData.password).pipe(
      mergeMap((response: AuthResponse): Observable<DocumentData> => {
        token = response.token;
        return this.authService.getAdditionalData(response.uid);
      }),
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setAuthLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((response: any): void => {
      const usersData = {...response};
      localStorage.setItem('userID', usersData['uid']);
      if (token) {
        this.authService.setToken(token.expiresIn, token.idToken);
      }
      this.router.navigate(['portal', 'dashboard']);
    });
  }
}
