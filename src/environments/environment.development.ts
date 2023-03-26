// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyBW_cPM4U3AcUtbMDx64KlWNfx703E_NcM',
		baseURL: 'https://firestore.googleapis.com/v1/',
		// authDomain: "wolf-359-base.firebaseapp.com",
		// databaseURL: "https://knobadev.firebaseio.com",
		projectId: 'wolf-359-base',
		// storageBucket: "wolf-359-base.appspot.com",
		// messagingSenderId: "387675175641",
		// appId: "1:387675175641:web:e8cb867caf5856a5059cc8"
	},
	dexie: {
		dbName: 'KnobaDB',
		version: 21,
		tables: {
			configuration: '',
			trashcan: 'id',

			bookmarks: 'id, *tags, clicks',
			// notes: 'id, *data.tags',
			// tasks: 'id, *data.tags',
			// words: 'id, *data.tags, data.term',
			// fasts: 'id',
			// weights: 'id',
			// workouts: 'id',

			// sync: 'id, collection, modification, updated, deleted',
			// syncBookmarks: '',
			conflicts: 'id'
		}
	},
	croppie: {
		styleUrl: 'https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.css',
		scriptUrl: 'https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js'
	},
	remoteURLLookup: 'https://title.mihir.ch/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
