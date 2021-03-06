import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {setAuthLoading} from "../../../store/actions/auth";
import {Store} from "@ngrx/store";
import {catchError, finalize, of} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {CustomValidators} from "../../../shared/custom-validators/custom-validators";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      // @ts-ignore
    }, CustomValidators.emailValidator);
  }

  sendResetPasswordRequest(): void {
    this.store.dispatch(setAuthLoading({isLoading: true}));
    this.authService.forgotPasswordRequest(this.form.value.email).pipe(
      finalize(() => {
        this.form.reset();
        this.store.dispatch(setAuthLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      this.store.dispatch(setSnackbar({text: 'Request sent on your email!', snackbarType: 'success'}));
      this.router.navigate(['login']);
    })
  }
}
