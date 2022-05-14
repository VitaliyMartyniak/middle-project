import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordComponent } from './profile-password.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {ProfileService} from "../../profile.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProfilePasswordComponent', () => {
  let component: ProfilePasswordComponent;
  let fixture: ComponentFixture<ProfilePasswordComponent>;
  let store: MockStore<any>;
  let profileService: ProfileService;

  const authMock = {
    currentUser: {
      email: 'email',
      emailVerified: true,
      isAnonymous: true,
      // @ts-ignore
      metadata: null,
      providerData: [],
      refreshToken: "string",
      tenantId: null,
      // @ts-ignore
      delete: () => {},
      // @ts-ignore
      getIdToken: () => "string",
      // @ts-ignore
      getIdTokenResult: () => {
        return {
          authTime: "string",
          expirationTime: "string",
          issuedAtTime: "string",
          signInProvider: null,
          signInSecondFactor: null,
          token: "string",
          claims: null,
        }
      },
      // @ts-ignore
      reload: () => {Promise.resolve()},
      toJSON: () => JSON.parse('string'),
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      declarations: [ ProfilePasswordComponent ],
      providers: [
        provideMockStore(),
        { provide: ProfileService,
          useValue: {
            checkOldPassword: () => {},
            updatePassword: () => {},
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    profileService = TestBed.inject(ProfileService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProfilePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  //
  // it('should update user password from profileService when updatePassword', () => {
  //   // @ts-ignore
  //   component.auth = authMock;
  //   const method = spyOn(store, 'dispatch')
  //   spyOn(profileService, 'checkOldPassword').and.returnValue(of(undefined));
  //   spyOn(profileService, 'updatePassword').and.returnValue(of(undefined));
  //   component.updatePassword();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: 'Password successfully updated!', snackbarType: 'success'}));
  // });
  //
  // it('should show error snackbar when updatePassword', () => {
  //   // @ts-ignore
  //   component.auth = authMock;
  //   const method = spyOn(store, 'dispatch')
  //   spyOn(profileService, 'checkOldPassword').and.returnValue(throwError(() => new Error("error")));
  //   component.updatePassword();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  // });
  //
  // it('should not update user password from profileService when updatePassword because of empty user', () => {
  //   // @ts-ignore
  //   component.auth = {
  //     currentUser: null
  //   }
  //   spyOn(profileService, 'checkOldPassword').and.returnValue(of(undefined));
  //   component.updatePassword();
  //   // @ts-ignore
  //   expect(profileService.checkOldPassword).toHaveBeenCalledTimes(0);
  // });
});
