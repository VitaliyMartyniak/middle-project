import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, finalize, of, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {authLoadingSelector, userSelector} from "../../../store/selectors/auth";
import {UserData} from "../../../shared/interfaces";
import {setAuthLoading} from "../../../store/actions/auth";
import {AuthService} from "../../../authentication/services/auth.service";
import {Router} from "@angular/router";
import {setSnackbar} from "../../../store/actions/notifications";
import {setArticles, setArticlesLoading} from "../../../store/actions/articles";
import {PortalService} from "../../services/portal.service";
import {NetworkService} from "../../../shared/services/network.service";

@Component({
  selector: 'app-portal-landing',
  templateUrl: './portal-landing.component.html',
  styleUrls: ['./portal-landing.component.scss']
})
export class PortalLandingComponent implements OnInit, OnDestroy {
  private networkSub: Subscription;
  private userSub: Subscription;
  private isLoadingSub: Subscription;
  user: UserData;
  isLoading = true;

  constructor(private networkService: NetworkService, private portalService: PortalService, private authService: AuthService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.getArticles();
    this.store.dispatch(setAuthLoading({isLoading: true}));
    this.userSub = this.store.select(userSelector).subscribe((user: UserData | null): void => {
      if (user) {
        this.user = user;
        this.store.dispatch(setAuthLoading({isLoading: false}));
      }
    })
    this.isLoadingSub = this.store.select(authLoadingSelector).subscribe((isLoading: boolean): void => {
      this.isLoading = isLoading;
    })
    this.networkSub = this.networkService.networkStatus$.subscribe(status => {
      if (status === 'online') {
        this.getArticles();
      }
    });
  }

  getArticles(): void {
    this.store.dispatch(setArticlesLoading({isLoading: true}));
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
    this.networkSub.unsubscribe();
  }
}
