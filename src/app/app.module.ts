import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthenticationModule} from "./authentication/authentication.module";
import {SharedModule} from "./shared/shared.module";
import { environment } from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import {EffectsModule} from "@ngrx/effects";
import {FiltersEffects} from "./store/effects/filters";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([FiltersEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
