import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {TestBed} from "@angular/core/testing";
import {ProfileGuard} from "../profile.guard";

describe('ProfileGuard', () => {
  let profileGuard: ProfileGuard;
  let store: MockStore<any>;
  let router: Router;

  const routerStub = {
    url: '',
    navigate: (route: string) => route
  }

  // @ts-ignore
  const route: ActivatedRouteSnapshot = null;
  // @ts-ignore
  const state: RouterStateSnapshot = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileGuard,
        provideMockStore(),
        { provide: Router, useValue: routerStub },
      ]
    });

    store = TestBed.inject(MockStore);
    profileGuard = TestBed.inject(ProfileGuard);
    router = TestBed.inject(Router);
  });

  it('create an instance', () => {
    expect(profileGuard).toBeTruthy();
  });

  it('should let user pass', () => {
    const method = spyOn(router, 'navigate');
    profileGuard.canActivate(route, state);
    expect(method).toHaveBeenCalledTimes(0);
  });

  // don't recomment
  // it('should redirect user to dashboard page', () => {
  //   store.setState({
  //     auth: {
  //       user: {
  //         name: "string",
  //         uid: "string",
  //         registrationType: "google",
  //       },
  //     }
  //   })
  //   const method = spyOn(router, 'navigate');
  //   profileGuard.canActivate(route, state);
  //   store.select(userSelector).subscribe((user) => {
  //     console.log(user)
  //   })
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(['/portal', 'dashboard'])
  // });
});
