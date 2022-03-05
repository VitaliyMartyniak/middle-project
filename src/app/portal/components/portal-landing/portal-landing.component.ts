import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {userSelector} from "../../../store/selectors/auth";
import {Article, UserData} from "../../../shared/interfaces";
import {PortalService} from "../../portal.service";
import {setArticles} from "../../../store/actions/articles";

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit {
  private userSub: Subscription;
  private articlesSub: Subscription;
  user: any = null;

  constructor(private authService: AuthService, private portalService: PortalService, private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.articlesSub = this.portalService.getArticles().subscribe((articles: Article[]) => {
      this.store.dispatch(setArticles({articles}));
    });
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
    })
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout().subscribe(() => {
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }
}
