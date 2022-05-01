import {setAuthLoading, setUser} from "../../actions/auth";
import {authReducer, initialState} from "../auth";

describe('Auth Reducer', () => {
  const user = {
    name: "string",
    uid: "string",
    registrationType: "string",
  };

  it('should return state with new user', () => {
    const state = authReducer(initialState, setUser({user}))
    expect(state.user).toEqual(user);
  });

  it('should return state with isLoading true', () => {
    const state = authReducer(initialState, setAuthLoading({isLoading: true}));
    expect(state.isLoading).toBe(true);
  });
});
