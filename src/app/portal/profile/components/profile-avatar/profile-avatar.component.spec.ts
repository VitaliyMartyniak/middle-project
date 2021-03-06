import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAvatarComponent } from './profile-avatar.component';
import {AuthService} from "../../../../authentication/services/auth.service";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {PhotoDndComponent} from "../../../../shared/components/photo-dnd/photo-dnd.component";
import {of, throwError} from "rxjs";
import {setSnackbar} from "../../../../store/actions/notifications";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProfileAvatarComponent', () => {
  let component: ProfileAvatarComponent;
  let fixture: ComponentFixture<ProfileAvatarComponent>;
  let authService: AuthService;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ProfileAvatarComponent,
      ],
      providers: [
        { provide: AuthService, useValue: {updateUserProfileInfo: () => {}} },
        provideMockStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProfileAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update base64File when updateFile', () => {
    component.updateFile('string');
    expect(component.base64File).toBe("string");
  });

  it('should update user profile info from authService when updateAvatar', () => {
    spyOn(authService, 'updateUserProfileInfo').and.returnValue(of(undefined));
    component.updateAvatar();
    expect(authService.updateUserProfileInfo).toHaveBeenCalled();
  });

  it('should show error snackbar when updateAvatar', () => {
    const method = spyOn(store, 'dispatch');
    spyOn(authService, 'updateUserProfileInfo').and.returnValue(throwError(() => new Error("error")));
    component.updateAvatar();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setSnackbar({text: new Error("error"), snackbarType: 'error'}));
  });
});
