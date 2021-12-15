import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { PortalLandingComponent } from './components/portal-landing/portal-landing.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: PortalLandingComponent, children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardComponent},
          // {path: 'register', component: SignUpComponent},
          // {path: 'forgot-password', component: ForgotPasswordComponent},
        ],
      },
      // {path: 'terms', component: TermsComponent},
      {path: '**', redirectTo: '/'},
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    PortalLandingComponent,
    DashboardComponent,
    ArticlesComponent,
    WeatherWidgetComponent
  ]
})
export class PortalModule { }
