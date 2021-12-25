import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { PortalLandingComponent } from './components/portal-landing/portal-landing.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { AddEditArticleComponent } from './views/add-edit-article/add-edit-article.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: PortalLandingComponent, children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'article', component: AddEditArticleComponent},
          {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)}
          // {path: 'register', component: SignUpComponent},
          // {path: 'forgot-password', component: ForgotPasswordComponent},
        ],
      },
      // {path: 'terms', component: TermsComponent},
      {path: '**', redirectTo: '/portal'},
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    PortalLandingComponent,
    DashboardComponent,
    ArticlesComponent,
    WeatherWidgetComponent,
    AddEditArticleComponent,
  ]
})
export class PortalModule { }
