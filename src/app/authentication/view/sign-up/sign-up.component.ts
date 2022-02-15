import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../shared/custom-validators";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

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

  submit() {
    const signUpData = {...this.form.value}
    const firebaseSignUpData = {
      email: signUpData.email,
      password: signUpData.password
    };
    this.authService.signUpUser(firebaseSignUpData).subscribe((data) => {
      const usersData = {
        name: signUpData.name,
        lastName: '',
        age: signUpData.age,
        uid: data.user.uid
      }
      this.authService.setAdditionalData(usersData).subscribe((id) => {
        this.authService.saveDocumentID(id).subscribe(() => {
          localStorage.setItem('userID', usersData.uid);
          this.authService.setToken(+data._tokenResponse.expiresIn, data._tokenResponse.idToken);
          this.form.reset();
          this.router.navigate(['portal', 'dashboard']);
        })
      })
    })
  }
}
