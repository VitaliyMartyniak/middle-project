import {snackbarSelector} from "../notifications";

const notificationsState = {
  snackbar: {
    text: '',
    snackbarType: ''
  }
};

const state = {notifications: notificationsState};

describe('Snackbar selectors', () => {
  it('should return snackbar', () => {
    const snackbar = snackbarSelector(state);
    expect(snackbar).toEqual(notificationsState.snackbar);
  });
});
