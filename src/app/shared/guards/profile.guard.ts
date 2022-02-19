import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {userSelector} from "../../store/selectors/auth";

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> |  Promise<boolean> | boolean {
    return this.store.select(userSelector).pipe(
      map((user => {
        if (user && user.registrationType === 'firebase') {
          return true
        } else {
          this.router.navigate(['/portal', 'dashboard']);
          return false
        }
      }))
    )
  }

}
