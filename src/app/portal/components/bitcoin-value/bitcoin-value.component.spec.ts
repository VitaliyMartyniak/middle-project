import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinValueComponent } from './bitcoin-value.component';
import {provideMockStore} from "@ngrx/store/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NetworkService} from "../../../shared/services/network.service";
import {BitcoinService} from "../../services/bitcoin.service";
import {throwError} from "rxjs";

describe('BitcoinValueComponent', () => {
  let component: BitcoinValueComponent;
  let fixture: ComponentFixture<BitcoinValueComponent>;
  let networkService: NetworkService;
  let bitcoinService: BitcoinService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinValueComponent ],
      providers: [
        provideMockStore(),
        NetworkService,
        BitcoinService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    bitcoinService = TestBed.inject(BitcoinService);
    networkService = TestBed.inject(NetworkService);
    fixture = TestBed.createComponent(BitcoinValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set new bitcoin value from WebSocket', () => {
  //   bitcoinService.bitcoinValue$.subscribe((value: any) => {
  //     expect(component.bitcoinValue).toBe(value.PRICE);
  //   });
  //   bitcoinService.bitcoinValue$.next({PRICE: 1});
  // });
  //
  // it('should unsubscribe from WebSocket because of error', () => {
  //   const method = spyOn(component, 'unsubscribeWebSocket');
  //   bitcoinService.bitcoinValue$.subscribe(() => {
  //     expect(method).toHaveBeenCalled();
  //   });
  //   bitcoinService.bitcoinValue$.next(throwError(() => new Error('error')));
  // });

  it('should subscribe again to WebSocket when user back online', () => {
    const method = spyOn(component, 'subscribeWebSocket');
    networkService.networkStatus$.next('online');
    expect(method).toHaveBeenCalled();
  });

  it('should unsubscribe from WebSocket when user goes offline', () => {
    const method = spyOn(component, 'unsubscribeWebSocket');
    networkService.networkStatus$.next('offline');
    expect(method).toHaveBeenCalled();
  });
});
