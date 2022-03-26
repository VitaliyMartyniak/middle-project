import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, NavigationStart, Event as NavigationEvent} from "@angular/router";
import {Subscription} from "rxjs";
import {authLoadingSelector} from "../../../store/selectors/auth";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss']
})
export class AuthLandingComponent implements OnInit, OnDestroy {
  currentRoute = '';
  isLoading = false;
  routerSub: Subscription;
  isLoadingSub: Subscription;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.routerSub = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart && (event.url === '/register' || event.url === '/forgot-password' || event.url === '/login')) {
            this.currentRoute = event.url;
          }
        });
    this.isLoadingSub = this.store.select(authLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
    })
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

}
