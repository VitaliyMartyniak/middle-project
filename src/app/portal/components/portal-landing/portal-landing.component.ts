import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../authentication/view/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit {
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
