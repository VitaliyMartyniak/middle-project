import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackbarSelector} from "../../../store/selectors/notifications";
import {clearSnackbar} from "../../../store/actions/notifications";
import {Snackbar} from "../../interfaces";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  snackbarSub: Subscription;

  constructor(private _snackBar: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.snackbarSub = this.store.select(snackbarSelector).subscribe((snackbar: Snackbar): void => {
      if (snackbar.text) {
        let snackBarRef = this._snackBar.open(snackbar.text, 'close', {duration: 5000, panelClass: [`${snackbar.snackbarType}-snackbar`]});
        snackBarRef.afterDismissed().subscribe((): void => {
          this.store.dispatch(clearSnackbar());
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.snackbarSub.unsubscribe();
  }

}
