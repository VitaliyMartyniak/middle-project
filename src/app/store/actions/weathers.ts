import {createAction, props} from "@ngrx/store";
import {LocationCoordinates} from "../../shared/interfaces";

export const setWeatherLocations = createAction('[WEATHERS] set weather locations',
  props<{weatherLocations: LocationCoordinates[]}>()
);

export const addNewWeatherLocation = createAction('[WEATHERS] add new weather location',
  props<{weatherLocation: LocationCoordinates}>()
);

export const setWeathersLoading = createAction('[WEATHERS] set weathers loading',
  props<{isLoading: boolean}>()
);
