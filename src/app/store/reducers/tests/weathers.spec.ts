import {initialState, weathersReducer, WeathersState} from "../weathers";
import {
  addNewWeatherLocation,
  setWeatherLocations,
  setWeathersLoading
} from "../../actions/weathers";

describe('Weathers Reducer', () => {
  it('should return state with new weather locations', () => {
    const weatherLocations = [
      {
        lat: 1,
        lon: 1,
      }
    ];
    const state = weathersReducer(initialState, setWeatherLocations({weatherLocations}))
    expect(state.weatherLocations).toEqual(weatherLocations);
  });

  it('should return state with added weather location', () => {
    const weatherLocation = {
      lat: 2,
      lon: 2,
    }
    const state = weathersReducer(initialState, addNewWeatherLocation({weatherLocation}))
    expect(state.weatherLocations).toEqual([weatherLocation]);
  });

  it('should return state with isLoading true', () => {
    const state = weathersReducer(initialState, setWeathersLoading({isLoading: true}));
    expect(state.isLoading).toBe(true);
  });
});
