import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";
import {setSnackbar} from "../../../store/actions/notifications";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-bitcoin-value',
  templateUrl: './bitcoin-value.component.html',
  styleUrls: ['./bitcoin-value.component.scss']
})
export class BitcoinValueComponent implements OnInit, OnDestroy {
  subject: WebSocketSubject<any>;
  bitcoinValue: number;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subject = new WebSocketSubject("wss://streamer.cryptocompare.com/v2?api_key=7326454d789bf44612f11e66aa2c57b83d3ad5add0fd1b32c4c518fa22a4e77d");
    this.subject.next({
      action: "SubAdd",
      subs: ["5~CCCAGG~BTC~USD",]
    });

    this.subject.subscribe(
      (data: any) => {
        console.log('data', data);
        if (data && data.PRICE) {
          this.bitcoinValue = data.PRICE;
        }
      },
      (e: string) => {
        this.unsubscribeWebSocket();
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }
    );
  }

  unsubscribeWebSocket(): void {
    this.subject.next({
      action: "SubRemove",
      subs: ["5~CCCAGG~BTC~USD",]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeWebSocket();
    this.subject.unsubscribe();
  }
}
