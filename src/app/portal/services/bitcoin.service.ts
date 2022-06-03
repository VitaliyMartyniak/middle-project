import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  bitcoinValue$ = new WebSocketSubject("wss://streamer.cryptocompare.com/v2?api_key=19bf20fbefe801d979dd040469ceba1728ac71667a1996b262bd34ea7d7e3251");
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
