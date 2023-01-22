// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyCGSsMz3yLA1Tx95_vEJbDphy9Vks8Svzs',
		baseURL: 'https://firestore.googleapis.com/v1/',
		// authDomain: "knobadev.firebaseapp.com",
		// databaseURL: "https://knobadev.firebaseio.com",
		projectId: 'knobadev',
		// storageBucket: "knobadev.appspot.com",
		// messagingSenderId: "568729951141",
		// appId: "1:568729951141:web:2578fc2d4105a1f9c7a64c"
	},
	dexie: {
		dbName: 'KnobaDB',
		version: 21,
		tables: {
			configuration: '',
			trashcan: 'id',

			bookmarks: 'id, *data.tags, data.clicks',
			notes: 'id, *data.tags',
			tasks: 'id, *data.tags',
			words: 'id, *data.tags, data.term',
			fasts: 'id',
			weights: 'id',
			workouts: 'id',

			// sync: 'id, collection, modification, updated, deleted',
			// syncBookmarks: '',
			conflicts: 'id'
		}
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
