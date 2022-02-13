import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
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
      const user = {
        email: response.user.email,
        uid: response.user.uid,
        registrationType: response.user.providerId,
      }
      this.authService.getAdditionalData(user.uid).subscribe(response => {
        const userWithAllData = {
          ...user,
          name: response.name,
          age: response.age,
        };
        this.store.dispatch(setUser({user: userWithAllData}));
        this.form.reset();
        this.router.navigate(['portal', 'dashboard']);
      });
    });
  }

  loginByGoogle() {
    this.authService.googleLogin().subscribe(response => {
      const clonedResponse = JSON.parse(JSON.stringify(response));
      const googleUser = {
        name: clonedResponse.user.displayName,
        email: clonedResponse.user.email,
        photoURL: clonedResponse.user.photoURL,
        uid: clonedResponse.user.uid,
        registrationType: clonedResponse.providerId,
      }
      this.store.dispatch(setUser({user: googleUser}));
      this.router.navigate(['portal', 'dashboard']);
    })
  }

  loginByFacebook() {
    this.authService.facebookLogin();
  }
}
