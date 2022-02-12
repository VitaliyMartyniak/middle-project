import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../authentication/view/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {userSelector} from "../../../store/selectors/auth";

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit {
  private userSub: Subscription;
  user: any = null;

  constructor(private authService: AuthService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.userSub = this.store.select(userSelector).subscribe((user: any): void => {
      this.user = user;
      console.log('user in component', this.user);
    })
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
