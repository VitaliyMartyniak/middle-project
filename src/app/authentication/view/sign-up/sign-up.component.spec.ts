import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {AuthService} from "../../services/auth.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthAlternativeComponent} from "../../components/auth-alternative/auth-alternative.component";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;
  let store: MockStore<any>;
  let router: Router;

  const routerStub = {
    url: '',
    navigate: (route: string) => route
  };

  const OAuthResponse = {
    token: {
      idToken: "string",
      expiresIn: 3600,
    },
    user: {
      name: "name",
      lastName: 'lastName',
      age: 23,
      uid: "uid",
      registrationType: "firebase",
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
      ],
      declarations: [
        SignUpComponent,
        AuthAlternativeComponent
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService,
          useValue: {
            signUpUser: () => {},
            setAdditionalData: () => {},
            saveDocumentID: () => {},
          }
        },
        provideMockStore(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should signup user', () => {
  //   // @ts-ignore
  //   spyOn(authService, 'signUpUser').and.callFake(() => of(OAuthResponse));
  //   // @ts-ignore
  //   spyOn(authService, 'setAdditionalData').and.callFake(() => of('value'));
  //   // @ts-ignore
  //   spyOn(authService, 'saveDocumentID').and.callFake(() => of());
  //   component.signUpUser();
  //   expect(authService.signUpUser).toHaveBeenCalled();
  //   expect(authService.setAdditionalData).toHaveBeenCalled();
  //   expect(authService.saveDocumentID).toHaveBeenCalled();
  // });
  //
  // it('should show error snackbar when signup user', () => {
  //   const method = spyOn(store, 'dispatch');
  //   // @ts-ignore
  //   spyOn(authService, 'signUpUser').and.callFake(() => throwError(() => new Error("error")));
  //   component.signUpUser();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  // });
});
