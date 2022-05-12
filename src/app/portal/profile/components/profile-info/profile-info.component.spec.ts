import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './profile-info.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AuthService} from "../../../../authentication/services/auth.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of, throwError} from "rxjs";
import {setProfileLoading} from "../../../../store/actions/profile";
import {setSnackbar} from "../../../../store/actions/notifications";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProfileInfoComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;
  let authService: AuthService;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      declarations: [ ProfileInfoComponent ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user: {
                name: 'Text',
                lastName: 'success',
                age: 1,
                docID: 'one'
              },
            }
          }
        }),
        { provide: AuthService, useValue: {updateUserProfileInfo: () => {}} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user profile info from authService when updateProfileInfo', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'updateUserProfileInfo').and.returnValue(of(undefined));
    component.updateProfileInfo();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setProfileLoading({isLoading: false}));
  });

  it('should not update user profile info from authService when updateProfileInfo', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'updateUserProfileInfo').and.returnValue(throwError(() => new Error("error")));
    component.updateProfileInfo();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
