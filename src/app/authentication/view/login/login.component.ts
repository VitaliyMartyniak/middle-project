import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthResponse} from "../../../shared/interfaces";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {setAuthLoading} from "../../../store/actions/auth";
import {Store} from "@ngrx/store";
import {catchError, finalize, mergeMap, Observable} from "rxjs";
import {setProfileLoading} from "../../../store/actions/profile";
import {setSnackbar} from "../../../store/actions/notifications";

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
      email: new FormControl('test@gmail.com', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('qwerty12', [
        Validators.required,
        Validators.minLength(8)
      ]),
    })
  }

  loginByEmail(): void {
    const loginData = {...this.form.value};
    this.store.dispatch(setAuthLoading({isLoading: true}));
    let loginResponse: AuthResponse;
    // this.authService.login(loginData.email, loginData.password).subscribe((response: AuthResponse) => {
    //   this.authService.getAdditionalData(response.uid).subscribe((usersData: DocumentData) => {
    //     localStorage.setItem('userID', usersData['uid']);
    //     this.authService.setToken(response.expiresIn, response.idToken);
    //     this.form.reset();
    //     this.store.dispatch(setAuthLoading({isLoading: false}));
    //     this.router.navigate(['portal', 'dashboard']);
    //   });
    // });
    this.authService.login(loginData.email, loginData.password).pipe(
      mergeMap((response: AuthResponse): Observable<DocumentData> => {
        loginResponse = response;
        return this.authService.getAdditionalData(response.uid);
      }),
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setAuthLoading({isLoading: false}));
      }),
      catchError((e): any => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }),
    ).subscribe((usersData: any): void => {
      localStorage.setItem('userID', usersData['uid']);
      this.authService.setToken(loginResponse.expiresIn, loginResponse.idToken);
      this.router.navigate(['portal', 'dashboard']);
    });
  }
}
