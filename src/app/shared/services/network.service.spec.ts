import { TestBed } from '@angular/core/testing';

import { NetworkService } from './network.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('NetworkService', () => {
  let service: NetworkService;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ]
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(NetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set online status to networkStatus$', () => {
    const method = spyOn(service.networkStatus$, 'next');
    // const offlineEvent = new Event('offline');
    const onlineEvent = new Event('online');

    service.monitor();

    // window.dispatchEvent(offlineEvent);
    window.dispatchEvent(onlineEvent);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith('online');
  });

  it('should set offline status to networkStatus$', () => {
    const method = spyOn(service.networkStatus$, 'next');
    const offlineEvent = new Event('offline');

    service.monitor();

    window.dispatchEvent(offlineEvent);
    // @ts-ignore
    expect(method).toHaveBeenCalledWith('offline');
  });
});
