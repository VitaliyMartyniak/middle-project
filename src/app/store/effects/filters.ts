import {Injectable} from "@angular/core";
import {debounceTime, map} from "rxjs";
import {debounceInput, setSearch} from "../actions/filters";
import {Actions, createEffect, ofType} from "@ngrx/effects";

@Injectable()
export class FiltersEffects {
  constructor(private actions$: Actions) {}

  debounceInput$ = createEffect(
    () => this.actions$.pipe(
      ofType(debounceInput),
      debounceTime(1000),
      map(({value}) => setSearch({search: value})),
    ));
}
