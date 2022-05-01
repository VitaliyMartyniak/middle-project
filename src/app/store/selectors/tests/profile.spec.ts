import {profileLoadingSelector} from "../profile";

const profileState = {
  isLoading: false,
};

const state = {profile: profileState};

describe('Profile selectors', () => {
  it('should return profile isLoading', () => {
    const isLoading = profileLoadingSelector(state);
    expect(isLoading).toEqual(profileState.isLoading);
  });
});
