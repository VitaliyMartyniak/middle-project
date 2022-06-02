import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService,
          useValue: {
            getAdditionalData: () => {},
            setToken: () => {},
            logout: () => {},
            isAuthenticated: () => {},
            autoLogin: () => {}
          }
        },
        provideMockStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
