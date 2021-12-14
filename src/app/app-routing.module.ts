import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    path: '', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule)
    // path: '', component: LandingTemplateComponent, children: [
      // {path: '', redirectTo: 'iphone', pathMatch: 'full'},
      // {path: 'iphone', component: IphoneCatalogComponent},
      // {path: 'iphone/:id', component: IphoneCatalogItemComponent},
      // {path: 'mac', component: MacCatalogComponent},
      // {path: 'mac/:id', component: MacCatalogItemComponent},
      // {path: 'watch', component: AppleWatchCatalogComponent},
      // {path: 'watch/:id', component: AppleWatchCatalogItemComponent},
      // {path: 'cart', component: CartComponent},
      // {path: 'feedback', component: FeedbackPageComponent},
      // {path: '**', redirectTo: '/'}
    // ],
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
