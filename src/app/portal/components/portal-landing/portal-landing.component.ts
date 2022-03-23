import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {authLoadingSelector, userSelector} from "../../../store/selectors/auth";
import {Article, UserData} from "../../../shared/interfaces";
import {PortalService} from "../../services/portal.service";
import {setArticles, setArticlesLoading} from "../../../store/actions/articles";
import {setAuthLoading} from "../../../store/actions/auth";

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit {
  private userSub: Subscription;
  private articlesSub: Subscription;
  private isLoadingSub: Subscription;
  user: any = null;
  isLoading = true;

  constructor(private authService: AuthService, private portalService: PortalService, private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(setArticlesLoading({isLoading: true}));
    this.store.dispatch(setAuthLoading({isLoading: true}));
    this.articlesSub = this.portalService.getArticles().subscribe((articles: Article[]) => {
      this.store.dispatch(setArticles({articles}));
      this.store.dispatch(setArticlesLoading({isLoading: false}));
    });
    this.userSub = this.store.select(userSelector).subscribe((user: UserData): void => {
      this.user = user;
      this.store.dispatch(setAuthLoading({isLoading: false}));
    })
    this.isLoadingSub = this.store.select(authLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
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
