import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  bitcoinValue$ = new WebSocketSubject("wss://streamer.cryptocompare.com/v2?api_key=7326454d789bf44612f11e66aa2c57b83d3ad5add0fd1b32c4c518fa22a4e77d");
  constructor() { }

  subscribeWebSocket(): void {
    this.bitcoinValue$.next({
      action: "SubAdd",
      subs: ["5~CCCAGG~BTC~USD",]
    });
  }

  unsubscribeWebSocket(): void {
    this.bitcoinValue$.next({
      action: "SubRemove",
      subs: ["5~CCCAGG~BTC~USD",]
    });
  }
}
