export const environment = {
	production: true,
	firebase: {
		apiKey: 'AIzaSyBgDcMEv-ddeUeqs61xYsASJcqsyLNYqlc',
		baseURL: 'https://firestore.googleapis.com/v1/',
		// authDomain: 'knoba-e5608.firebaseapp.com',
		// databaseURL: 'https://knoba-e5608.firebaseio.com',
		projectId: 'knoba-e5608',
		// storageBucket: 'knoba-e5608.appspot.com',
		// messagingSenderId: '992623957226'
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