import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {of} from "rxjs";
import {setUser} from "../../store/actions/auth";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore<any>;

  const mockedUser = {
    name: "string",
    uid: "string",
    registrationType: "string",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        // { provide: AuthService,
        //   useValue: {
        //     getAdditionalData: () => {},
        //     setToken: () => {},
        //     logout: () => {},
        //     isAuthenticated: () => {},
        //     autoLogin: () => {}
        //   }
        // },
        provideMockStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  //
  // it('should try to autologin user that logged with email and password', () => {
  //   localStorage.setItem('userID', "id");
  //   const method = spyOn(store, 'dispatch');
  //   spyOn(service, 'getAdditionalData').and.returnValue(of(mockedUser));
  //   service.autoLogin();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setUser({user: mockedUser}));
  // });
  //
  // it('should try to autologin user that logged alternative way', () => {
  //   localStorage.setItem('alternativeUser', JSON.stringify(mockedUser));
  //   const method = spyOn(store, 'dispatch');
  //   service.autoLogin();
  //   // @ts-ignore
  //   expect(method).toHaveBeenCalledWith(setUser({user: JSON.parse(JSON.stringify(mockedUser))}));
  // });
  //
  // it('should return current state of isAuthenticated', () => {
  //   service.setToken(3600, 'token');
  //   const result = service.isAuthenticated();
  //   expect(result).toBe(true);
  // });
  //
  // it('should logout user automatically', () => {
  //   const method = spyOn(service, 'logout');
  //   service.setToken(-1, 'token');
  //   service.isAuthenticated();
  //   expect(method).toHaveBeenCalled();
  // });

});
