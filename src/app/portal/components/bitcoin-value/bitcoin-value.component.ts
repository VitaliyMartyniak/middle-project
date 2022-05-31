import {Component, OnDestroy, OnInit} from '@angular/core';
import {setSnackbar} from "../../../store/actions/notifications";
import {Store} from "@ngrx/store";
import {NetworkService} from "../../../shared/services/network.service";
import {BitcoinService} from "../../services/bitcoin.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bitcoin-value',
  templateUrl: './bitcoin-value.component.html',
  styleUrls: ['./bitcoin-value.component.scss']
})
export class BitcoinValueComponent implements OnInit, OnDestroy {
  bitcoinSub: Subscription;
  networkSub: Subscription;
  bitcoinValue: number;

  constructor(private networkService: NetworkService,
              private bitcoinService: BitcoinService,
              private store: Store) { }

  ngOnInit(): void {
    this.subscribeWebSocket();

    this.bitcoinSub = this.bitcoinService.bitcoinValue$.subscribe(
      (data: any) => {
        if (data && data.PRICE) {
          this.bitcoinValue = data.PRICE;
        }
      },
      (e: string) => {
        this.unsubscribeWebSocket();
        this.store.dispatch(setSnackbar({text: e, snackbarType: 'error'}));
      }
    );

    this.networkSub = this.networkService.networkStatus$.subscribe(status => {
      if (status === 'online') {
        this.subscribeWebSocket();
      } else if (status === 'offline') {
        this.unsubscribeWebSocket();
      }
    });
  }

  subscribeWebSocket(): void {
    this.bitcoinService.subscribeWebSocket();
  }

  unsubscribeWebSocket(): void {
    this.bitcoinService.unsubscribeWebSocket();
  }

  ngOnDestroy(): void {
    this.unsubscribeWebSocket();
    this.bitcoinSub.unsubscribe();
    this.networkSub.unsubscribe();
  }
}
