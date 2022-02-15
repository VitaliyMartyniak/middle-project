import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./view/login/login.component";
import {SignUpComponent} from "./view/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./view/forgot-password/forgot-password.component";
import {AuthLandingComponent} from './components/auth-landing/auth-landing.component';
import { TermsComponent } from './view/terms/terms.component';
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "./services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLandingComponent, children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent},
          {path: 'register', component: SignUpComponent},
          {path: 'forgot-password', component: ForgotPasswordComponent},
        ],
      },
      {path: 'terms', component: TermsComponent},
      {path: '**', redirectTo: '/'},
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    AuthLandingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    TermsComponent,
  ],
  providers: [AuthService]
})
export class AuthenticationModule { }
