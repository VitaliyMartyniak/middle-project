import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./view/login/login.component";
import {SignUpComponent} from "./view/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./view/forgot-password/forgot-password.component";
import {AuthLandingComponent} from './components/auth-landing/auth-landing.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TermsComponent } from './view/terms/terms.component';

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
      },
      {path: 'terms', component: TermsComponent},
      {path: '**', redirectTo: '/'},
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [RouterModule],
  declarations: [
    AuthLandingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    TermsComponent,
  ]
})
export class AuthenticationModule { }
