import {Component, OnDestroy, OnInit} from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Component({
  selector: 'app-bitcoin-value',
  templateUrl: './bitcoin-value.component.html',
  styleUrls: ['./bitcoin-value.component.scss']
})
export class BitcoinValueComponent implements OnInit, OnDestroy {
  subject: WebSocketSubject<any>;
  bitcoinValue: number;

  constructor() { }

  ngOnInit(): void {
    this.subject = new WebSocketSubject("wss://streamer.cryptocompare.com/v2?api_key=7326454d789bf44612f11e66aa2c57b83d3ad5add0fd1b32c4c518fa22a4e77d");
    this.subject.next({
      action: "SubAdd",
      subs: ["5~CCCAGG~BTC~USD",]
    });

    this.subject.subscribe(
      (data: any) => {
        if (data && data.PRICE) {
          this.bitcoinValue = data.PRICE;
        }
      }, // Called whenever there is a message from the server.
      (err: any) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
