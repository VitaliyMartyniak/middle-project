import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'portal', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule)},
  {path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
