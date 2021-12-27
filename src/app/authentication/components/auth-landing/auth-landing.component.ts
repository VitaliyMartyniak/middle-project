import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from "@angular/router";

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss']
})
export class AuthLandingComponent implements OnInit {
  currentRoute = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart) {
            this.currentRoute = event.url;
            console.log(this.currentRoute);
          }
        });
  }

}
