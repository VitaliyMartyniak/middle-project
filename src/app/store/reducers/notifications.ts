import {createReducer, on} from "@ngrx/store";
import {clearSnackbar, setSnackbar} from "../actions/notifications";
import {Snackbar} from "../../shared/interfaces";

export interface NotificationsState {
  snackbar: Snackbar
}

export const initialState: NotificationsState = {
  snackbar: {
    text: '',
    snackbarType: '',
  },
}

export const notificationsReducer = createReducer(
  initialState,
  on(setSnackbar, (state, {text, snackbarType}) => ({
    ...state,
    snackbar: {
      text,
      snackbarType
    }
  })),
  on(clearSnackbar, (state) => ({
    ...state,
    snackbar: {
      text: '',
      snackbarType: '',
    }
  })),
);
