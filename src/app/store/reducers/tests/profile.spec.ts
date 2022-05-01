import {initialState, profileReducer} from "../profile";
import {setProfileLoading} from "../../actions/profile";

describe('Profile Reducer', () => {
  it('should return state with isLoading true', () => {
    const state = profileReducer(initialState, setProfileLoading({isLoading: true}));
    expect(state.isLoading).toBe(true);
  });
});
