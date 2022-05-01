import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './profile-info.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AuthService} from "../../../../authentication/services/auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../environments/environment";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EMPTY, of} from "rxjs";
import {setProfileLoading} from "../../../../store/actions/profile";

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
        AngularFireModule.initializeApp(environment.firebase),
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
        AuthService,
      ]
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
    spyOn(authService, 'updateUserProfileInfo').and.callFake(() => of(undefined));
    component.updateProfileInfo();
    // @ts-ignore
    expect(method).toHaveBeenCalledWith(setProfileLoading({isLoading: false}));
  });
});
