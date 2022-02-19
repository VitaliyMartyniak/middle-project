import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss']
})
export class AuthLandingComponent implements OnInit, OnDestroy {
  currentRoute = '';
  routerSub: Subscription

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.routerSub = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart && (event.url === '/register' || event.url === '/forgot-password' || event.url === '/login')) {
            this.currentRoute = event.url;
          }
        });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

}
