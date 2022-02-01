// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./interface";

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyAtfjX7eKFbmxD7YqV6KPr8mT-lMDwowmU',
  fbDBUrl: 'https://middle-project-6ebe9-default-rtdb.europe-west1.firebasedatabase.app',
  firebase: {
    projectId: 'middle-project-6ebe9',
    appId: '1:80358471860:web:3a59fd3b4368d4a2feffe1',
    databaseURL: 'https://middle-project-6ebe9-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'middle-project-6ebe9.appspot.com',
    apiKey: 'AIzaSyAtfjX7eKFbmxD7YqV6KPr8mT-lMDwowmU',
    authDomain: 'middle-project-6ebe9.firebaseapp.com',
    messagingSenderId: '80358471860',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
