import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

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
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    })
    // this.authService.googleAuthObservable().subscribe(user => {
    //   console.log('user', user);
    //   console.log('user name', user?.getBasicProfile().getName());
    // });
  }

  submit() {
    const loginData = {...this.form.value};
    this.authService.login(loginData).subscribe(user => {
      this.form.reset();
      this.router.navigate(['portal', 'dashboard']);
    })
  }

  loginByGoogle() {
    this.authService.googleLogin();
  }

  loginByFacebook() {
    this.authService.facebookLogin();
  }
}
