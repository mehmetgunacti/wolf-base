export const environment = {
	production: true,
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