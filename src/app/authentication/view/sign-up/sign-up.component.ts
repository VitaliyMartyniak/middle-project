import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../shared/custom-validators/custom-validators";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthResponse, Token, UserData} from "../../../shared/interfaces";
import {setAuthLoading} from "../../../store/actions/auth";
import {Store} from "@ngrx/store";
import {catchError, finalize, mergeMap, Observable, of} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      acceptTerms: new FormControl(false, [
        Validators.requiredTrue,
      ]),
      // @ts-ignore
    }, CustomValidators.passwordMatchValidator);
  }

  signUpUser(): void {
    const signUpData = {...this.form.value}
    this.store.dispatch(setAuthLoading({isLoading: true}));
    let usersDataUID: string;
    let token: Token;
    this.authService.signUpUser(signUpData.email, signUpData.password).pipe(
      mergeMap((response: AuthResponse): Observable<string> => {
        const usersData: UserData = {
          name: signUpData.name,
          lastName: '',
          age: signUpData.age,
          uid: response.uid,
          registrationType: 'firebase',
        }
        usersDataUID = usersData.uid;
        token = response.token;
        return this.authService.setAdditionalData(usersData);
      }),
      mergeMap((id: string): Observable<void> => {
        return this.authService.saveDocumentID(id);
      }),
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setAuthLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      localStorage.setItem('userID', usersDataUID);
      if (token) {
        this.authService.setToken(token.expiresIn, token.idToken);
      }
      this.router.navigate(['portal', 'dashboard']);
    });
  }
}
