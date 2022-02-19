import { Component, OnInit } from '@angular/core';
import {setUser} from "../../../store/actions/auth";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-alternative',
  templateUrl: './auth-alternative.component.html',
  styleUrls: ['./auth-alternative.component.scss']
})
export class AuthAlternativeComponent {

  constructor(private authService: AuthService, private store: Store, private router: Router) { }

  loginByGoogle() {
    this.authService.googleLogin().subscribe(response => {
      const clonedResponse = JSON.parse(JSON.stringify(response));
      const usersData = {
        name: clonedResponse.user.displayName,
        email: clonedResponse.user.email,
        photoUrl: clonedResponse.user.photoURL,
        uid: clonedResponse.user.uid,
        registrationType: clonedResponse.providerId,
      }
      localStorage.setItem('alternativeUser', JSON.stringify(usersData));
      this.authService.setToken(+clonedResponse._tokenResponse.expiresIn, clonedResponse._tokenResponse.idToken);
      this.router.navigate(['portal', 'dashboard']);
    })
  }

  loginByFacebook() {
    this.authService.facebookLogin();
  }

}
