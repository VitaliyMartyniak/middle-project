import {createAction, props} from "@ngrx/store";
import {LocationCoordinates} from "../../shared/interfaces";

export const setWeathers = createAction('[WEATHERS] set weathers',
  props<{weathers: LocationCoordinates[]}>()
);

export const addNewWeather = createAction('[WEATHERS] add new weather',
  props<{weather: LocationCoordinates}>()
);

export const removeWeather = createAction('[WEATHERS] remove weather',
  props<{docID: string}>()
);

export const setWeathersLoading = createAction('[WEATHERS] set weathers loading',
  props<{isLoading: boolean}>()
);
