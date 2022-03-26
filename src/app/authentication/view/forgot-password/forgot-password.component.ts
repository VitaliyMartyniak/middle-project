import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {setAuthLoading} from "../../../store/actions/auth";
import {Store} from "@ngrx/store";

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
        Validators.email,
        Validators.required,
      ]),
    });
  }

  sendResetPasswordRequest(): void {
    this.store.dispatch(setAuthLoading({isLoading: true}));
    this.authService.forgotPasswordRequest(this.form.value.email).subscribe(() => {
      this.form.reset();
      this.store.dispatch(setAuthLoading({isLoading: false}));
      this.router.navigate(['login']);
    })
  }
}
