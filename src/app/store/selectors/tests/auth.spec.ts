import {authLoadingSelector, userSelector} from "../auth";

const authState = {
  user: {
    name: "string",
    uid: "string",
    registrationType: "string",
  },
  isLoading: false,
};

const state = {auth: authState};

describe('Auth selectors', () => {
  it('should return user', () => {
    const user = userSelector(state);
    expect(user).toEqual(authState.user);
  });

  it('should return auth isLoading', () => {
    const isLoading = authLoadingSelector(state);
    expect(isLoading).toEqual(authState.isLoading);
  });
});
