import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAlternativeComponent } from './auth-alternative.component';
import {AuthService} from "../../services/auth.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../../../shared/shared.module";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AuthAlternativeComponent', () => {
  let component: AuthAlternativeComponent;
  let fixture: ComponentFixture<AuthAlternativeComponent>;
  let authService: AuthService;
  let store: MockStore<any>;
  let router: Router;

  const OAuthResponse = {
    token: {
      idToken: "string",
      expiresIn: 3600,
    },
    user: {
      name: "name",
      uid: "uid",
      registrationType: "string",
    }
  };

  const routerStub = {
    url: '',
    navigate: (route: string) => route
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthAlternativeComponent ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService,
          useValue: {
            googleLogin: () => {},
            facebookLogin: () => {},
            setToken: () => {},
          }
        },
        provideMockStore(),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(AuthAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call googleLogin in authService', () => {
  //   const method = spyOn(component, 'processUser');
  //   // @ts-ignore
  //   spyOn(authService, 'googleLogin').and.callFake(() => {
  //     // @ts-ignore
  //     return of(OAuthResponse)
  //   });
  //   component.loginByGoogle();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(OAuthResponse);
  // });
  //
  // it('should show error snackbar when googleLogin fails', () => {
  //   const method = spyOn(store, 'dispatch');
  //   // @ts-ignore
  //   spyOn(authService, 'googleLogin').and.callFake(() => throwError(() => new Error("error")));
  //   component.loginByGoogle();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  // });
  //
  // it('should call facebookLogin in authService', () => {
  //   const method = spyOn(component, 'processUser');
  //   // @ts-ignore
  //   spyOn(authService, 'facebookLogin').and.callFake(() => {
  //     // @ts-ignore
  //     return of(OAuthResponse)
  //   });
  //   component.loginByFacebook();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(OAuthResponse);
  // });
  //
  // it('should show error snackbar when facebookLogin fails', () => {
  //   const method = spyOn(store, 'dispatch');
  //   // @ts-ignore
  //   spyOn(authService, 'facebookLogin').and.callFake(() => throwError(() => new Error("error")));
  //   component.loginByFacebook();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  // });
  //
  // it('should set user to localStorage when processUser', () => {
  //   component.processUser(OAuthResponse);
  //   expect(localStorage.getItem('alternativeUser')).toEqual(JSON.stringify(OAuthResponse.user));
  // });

  it('should set token in authService when processUser', () => {
    const method = spyOn(authService, 'setToken');
    component.processUser(OAuthResponse);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(3600, 'string');
  });

  it('should navigate to portal dashboard when processUser', () => {
    const method = spyOn(router, 'navigate');
    component.processUser(OAuthResponse);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(['portal', 'dashboard']);
  });
});
