import {initialState, notificationsReducer} from "../notifications";
import {clearSnackbar, setSnackbar} from "../../actions/notifications";

describe('Notifications Reducer', () => {
  it('should return state with new snackbar', () => {
    const state = notificationsReducer(initialState, setSnackbar({snackbarType: "success", text: "text"}));
    expect(state.snackbar.text).toBe("text");
    expect(state.snackbar.snackbarType).toBe("success");
  });

  it('should return state with clear snackbar', () => {
    const state = notificationsReducer(initialState, clearSnackbar());
    expect(state.snackbar.text).toBe("");
    expect(state.snackbar.snackbarType).toBe("");
  });
});
