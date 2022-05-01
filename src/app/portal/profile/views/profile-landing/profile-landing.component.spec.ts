import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLandingComponent } from './profile-landing.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ProfileInfoComponent} from "../../components/profile-info/profile-info.component";
import {ProfileAvatarComponent} from "../../components/profile-avatar/profile-avatar.component";
import {ProfilePasswordComponent} from "../../components/profile-password/profile-password.component";
import {AuthService} from "../../../../authentication/services/auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../environments/environment";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PhotoDndComponent} from "../../../../shared/components/photo-dnd/photo-dnd.component";
import {MatTabsModule} from "@angular/material/tabs";

describe('ProfileLandingComponent', () => {
  let component: ProfileLandingComponent;
  let fixture: ComponentFixture<ProfileLandingComponent>;
  let authService: AuthService;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [
        ProfileLandingComponent,
        ProfileInfoComponent,
        ProfileAvatarComponent,
        ProfilePasswordComponent,
        PhotoDndComponent,
      ],
      providers: [
        AuthService,
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
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProfileLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe when ngOnDestroy', () => {
    // @ts-ignore
    const method = spyOn(component.userSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(method).toHaveBeenCalled();
  });
});
