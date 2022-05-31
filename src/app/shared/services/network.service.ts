import { Injectable } from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {setSnackbar} from "../../store/actions/notifications";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  networkStatus$: Subject<'online' | 'offline'> = new Subject<"online" | "offline">();
  constructor(private store: Store) { }

  monitor() {
    fromEvent(window, 'online').subscribe(() => {
      this.networkStatus$.next('online');
      this.store.dispatch(setSnackbar({text: "You're back online!", snackbarType: 'success'}));
    });

    fromEvent(window, 'offline').subscribe(() => {
      this.networkStatus$.next('offline');
      this.store.dispatch(setSnackbar({text: "You're offline!", snackbarType: 'error'}));
    });
  }
}
