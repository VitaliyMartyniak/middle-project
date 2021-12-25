import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import { ProfileLandingComponent } from './views/profile-landing/profile-landing.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileAvatarComponent } from './components/profile-avatar/profile-avatar.component';
import { ProfilePasswordComponent } from './components/profile-password/profile-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ProfileLandingComponent},
      // {
      //   path: '', component: ProfileLandingComponent, children: [
      //     // {path: 'register', component: SignUpComponent},
      //     // {path: 'forgot-password', component: ForgotPasswordComponent},
      //   ],
      // },
      // {path: 'terms', component: TermsComponent},
      {path: '**', redirectTo: '/'},
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    ProfileLandingComponent,
    ProfileInfoComponent,
    ProfileAvatarComponent,
    ProfilePasswordComponent
  ],
})
export class ProfileModule { }
