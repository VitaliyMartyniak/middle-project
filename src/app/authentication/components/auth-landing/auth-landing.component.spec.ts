import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLandingComponent } from './auth-landing.component';
import {NavigationStart, Router} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Observable} from "rxjs";

describe('AuthLandingComponent', () => {
  let component: AuthLandingComponent;
  let fixture: ComponentFixture<AuthLandingComponent>;
  let store: MockStore<any>;
  let router: Router;

  class RouterStub {
    public ne = new NavigationStart(0, '/login');
    public events = new Observable(observer => {
      observer.next(this.ne);
      observer.complete();
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLandingComponent ],
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        provideMockStore(),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AuthLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current route to login on ngOnInit', () => {
    expect(component.currentRoute).toBe('/login');
  });
});
