import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setUser} from "../../../store/actions/auth";

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

  loginByEmail() {
    const loginData = {...this.form.value};
    this.authService.login(loginData).subscribe(response => {
      this.authService.getAdditionalData(response.user.uid).subscribe(usersData => {
        localStorage.setItem('userID', usersData.uid);
        this.authService.setToken(+response._tokenResponse.expiresIn, response._tokenResponse.idToken);
        this.form.reset();
        this.router.navigate(['portal', 'dashboard']);
      });
    });
  }
}
