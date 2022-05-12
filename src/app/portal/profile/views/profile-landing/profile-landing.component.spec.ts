import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLandingComponent } from './profile-landing.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AuthService} from "../../../../authentication/services/auth.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTabsModule} from "@angular/material/tabs";
import {ProfileService} from "../../profile.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

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
      ],
      declarations: [ProfileLandingComponent],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: ProfileService, useValue: {} },
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
