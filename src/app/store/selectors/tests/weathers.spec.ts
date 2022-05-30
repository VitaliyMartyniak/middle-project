import {weatherLocationsSelector, weathersLoadingSelector} from "../weathers";

const weathersState = {
  weatherLocations: [
    {
      lat: 1,
      lon: 1,
      id: "one"
    }
  ],
  isLoading: false,
};

const state = {weathers: weathersState};

describe('Weathers selectors', () => {
  it('should return weather locations', () => {
    const weatherLocations = weatherLocationsSelector(state);
    expect(weatherLocations).toEqual(weathersState.weatherLocations);
  });

  it('should return weathers isLoading', () => {
    const isLoading = weathersLoadingSelector(state);
    expect(isLoading).toEqual(weathersState.isLoading);
  });
});
