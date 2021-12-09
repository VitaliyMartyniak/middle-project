import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./view/login/login.component";
import {SignUpComponent} from "./view/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./view/forgot-password/forgot-password.component";
import {AuthLandingComponent} from './components/auth-landing/auth-landing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLandingComponent, children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent},
          {path: 'register', component: SignUpComponent},
          {path: 'forgot-password', component: ForgotPasswordComponent},
        ],
      }
    ])
  ],
  exports: [RouterModule],
  declarations: [
    AuthLandingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent
  ]
})
export class AuthenticationModule { }
