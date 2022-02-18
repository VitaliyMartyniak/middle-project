import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {userSelector} from "../../../store/selectors/auth";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit {
  private userSub: Subscription;
  user: any = null;

  constructor(private authService: AuthService, private router: Router, private store: Store, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: any): void => {
      this.user = user;
    })
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }
}
