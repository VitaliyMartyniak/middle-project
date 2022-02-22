import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthResponse} from "../../../shared/interfaces";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

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
    this.authService.login(loginData.email, loginData.password).subscribe((response: AuthResponse) => {
      this.authService.getAdditionalData(response.uid).subscribe((usersData: DocumentData) => {
        localStorage.setItem('userID', usersData['uid']);
        this.authService.setToken(response.expiresIn, response.idToken);
        this.form.reset();
        this.router.navigate(['portal', 'dashboard']);
      });
    });
  }
}
