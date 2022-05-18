import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../authentication/services/auth.service";
import {Router} from "@angular/router";
import {catchError, finalize, of, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {authLoadingSelector, userSelector} from "../../../store/selectors/auth";
import {UserData} from "../../../shared/interfaces";
import {PortalService} from "../../services/portal.service";
import {setArticles, setArticlesLoading} from "../../../store/actions/articles";
import {setAuthLoading} from "../../../store/actions/auth";
import {setSnackbar} from "../../../store/actions/notifications";

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private isLoadingSub: Subscription;
  user: UserData;
  isLoading = true;

  constructor(private authService: AuthService, private portalService: PortalService, private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(setArticlesLoading({isLoading: true}));
    this.store.dispatch(setAuthLoading({isLoading: true}));
    this.portalService.getArticles().pipe(
      finalize((): void => {
        this.store.dispatch(setArticlesLoading({isLoading: false}));
      }),
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe((articles: any) => {
      this.store.dispatch(setArticles({articles}));
    });
    this.userSub = this.store.select(userSelector).subscribe((user: UserData | null): void => {
      if (user) {
        this.user = user;
        this.store.dispatch(setAuthLoading({isLoading: false}));
      }
    })
    this.isLoadingSub = this.store.select(authLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
    })
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout().pipe(
      catchError((e) => {
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
        return of([]);
      }),
    ).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }
}
