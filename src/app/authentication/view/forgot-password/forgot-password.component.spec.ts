import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {AuthService} from "../../services/auth.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../store/actions/notifications";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ForgotPasswordComponent', () => {
  let store: MockStore<any>;
  let authService: AuthService;
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let router: Router;

  const routerStub = {
    url: '',
    navigate: (route: string) => route
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [ ForgotPasswordComponent ],
      providers: [
        { provide: AuthService, useValue: {forgotPasswordRequest: () => {}} },
        provideMockStore(),
        { provide: Router, useValue: routerStub },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send reset password request', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'forgotPasswordRequest').and.returnValue(of(undefined));
    component.sendResetPasswordRequest();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: 'Request sent on your email!', snackbarType: 'success'}));
  });

  it('should show error snackbar when send reset password request', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'forgotPasswordRequest').and.returnValue(throwError(() => new Error("error")));
    component.sendResetPasswordRequest();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
