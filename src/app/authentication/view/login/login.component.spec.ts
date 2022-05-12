import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../services/auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {AuthAlternativeComponent} from "../../components/auth-alternative/auth-alternative.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
      uid: "uid",
      registrationType: "string",
    },
    uid: "uid",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [
        LoginComponent,
        AuthAlternativeComponent
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService,
          useValue: {
            setToken: () => {},
            login: () => {},
            getAdditionalData: () => {},
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user', () => {
    const method = spyOn(authService, 'setToken');
    spyOn(authService, 'login').and.returnValue(of(OAuthResponse));
    // @ts-ignore
    const documentData: DocumentData = {};
    spyOn(authService, 'getAdditionalData').and.returnValue(of(documentData));
    component.loginByEmail();
    expect(method).toHaveBeenCalled();
  });

  it('should show error snackbar', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error("error")));
    component.loginByEmail();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
