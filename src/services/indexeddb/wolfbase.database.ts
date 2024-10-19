import { IndexedDbConfiguration } from 'lib/models/indexeddb.model';
import { dbCommands } from './db.command';

const ID = 'id';

export const indexedDbConfiguration: IndexedDbConfiguration = {

	dbName: 'MyDatabase',
	upgrades: {

		20: [

			// bookmarks: 'id',
			new dbCommands.CreateStoreCommand('bookmarks', { keyPath: ID, autoIncrement: false }),

			// bookmarks_sync: 'id',
			new dbCommands.CreateStoreCommand('bookmarks_sync', { keyPath: ID, autoIncrement: false }),

			// bookmarks_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('bookmarks_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('bookmarks_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('bookmarks_trash', 'name', 'name', { unique: false }),

			// bookmarks_remote: 'id',
			new dbCommands.CreateStoreCommand('bookmarks_remote', { keyPath: ID, autoIncrement: false }),

			// bookmarks_clicks: 'id, current',
			new dbCommands.CreateStoreCommand('bookmarks_clicks', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('bookmarks_clicks', 'current', 'current', { unique: false }),


			// notes: 'id, name, parentId',
			new dbCommands.CreateStoreCommand('notes', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('notes', 'name', 'name', { unique: false }),
			new dbCommands.AddIndexCommand('notes', 'parentId', 'parentId', { unique: false }),

			// notes_sync: 'id',
			new dbCommands.CreateStoreCommand('notes_sync', { keyPath: ID, autoIncrement: false }),

			// notes_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('notes_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('notes_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('notes_trash', 'name', 'name', { unique: false }),

			// notes_remote: 'id',
			new dbCommands.CreateStoreCommand('notes_remote', { keyPath: ID, autoIncrement: false }),


			// note_content: 'id, name, content',
			new dbCommands.CreateStoreCommand('note_content', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('note_content', 'name', 'name', { unique: false }),
			new dbCommands.AddIndexCommand('note_content', 'content', 'content', { unique: false }),

			// note_content_sync: 'id',
			new dbCommands.CreateStoreCommand('note_content_sync', { keyPath: ID, autoIncrement: false }),

			// note_content_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('note_content_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('note_content_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('note_content_trash', 'name', 'name', { unique: false }),

			// note_content_remote: 'id',
			new dbCommands.CreateStoreCommand('note_content_remote', { keyPath: ID, autoIncrement: false }),


			// projects: 'id, name',
			new dbCommands.CreateStoreCommand('projects', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('projects', 'name', 'name', { unique: false }),

			// projects_sync: 'id',
			new dbCommands.CreateStoreCommand('projects_sync', { keyPath: ID, autoIncrement: false }),

			// projects_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('projects_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('projects_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('projects_trash', 'name', 'name', { unique: false }),

			// projects_remote: 'id',
			new dbCommands.CreateStoreCommand('projects_remote', { keyPath: ID, autoIncrement: false }),


			// quiz_entries: 'id, name',
			new dbCommands.CreateStoreCommand('quiz_entries', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('quiz_entries', 'name', 'name', { unique: false }),

			// quiz_entries_sync: 'id',
			new dbCommands.CreateStoreCommand('quiz_entries_sync', { keyPath: ID, autoIncrement: false }),

			// quiz_entries_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('quiz_entries_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('quiz_entries_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('quiz_entries_trash', 'name', 'name', { unique: false }),

			// quiz_entries_remote: 'id',
			new dbCommands.CreateStoreCommand('quiz_entries_remote', { keyPath: ID, autoIncrement: false }),


			// quotes: 'id, name',
			new dbCommands.CreateStoreCommand('quotes', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('quotes', 'name', 'name', { unique: false }),

			// quotes_sync: 'id',
			new dbCommands.CreateStoreCommand('quotes_sync', { keyPath: ID, autoIncrement: false }),

			// quotes_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('quotes_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('quotes_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('quotes_trash', 'name', 'name', { unique: false }),

			// quotes_remote: 'id',
			new dbCommands.CreateStoreCommand('quotes_remote', { keyPath: ID, autoIncrement: false }),


			// tasks: 'id, name',
			new dbCommands.CreateStoreCommand('tasks', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('tasks', 'name', 'name', { unique: false }),

			// tasks_sync: 'id',
			new dbCommands.CreateStoreCommand('tasks_sync', { keyPath: ID, autoIncrement: false }),

			// tasks_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('tasks_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('tasks_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('tasks_trash', 'name', 'name', { unique: false }),

			// tasks_remote: 'id',
			new dbCommands.CreateStoreCommand('tasks_remote', { keyPath: ID, autoIncrement: false }),


			// words: 'id, name',
			new dbCommands.CreateStoreCommand('words', { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand('words', 'name', 'name', { unique: false }),

			// words_sync: 'id',
			new dbCommands.CreateStoreCommand('words_sync', { keyPath: ID, autoIncrement: false }),

			// words_trash: '++, id, name',
			new dbCommands.CreateStoreCommand('words_trash', { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand('words_trash', 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand('words_trash', 'name', 'name', { unique: false }),

			// words_remote: 'id',
			new dbCommands.CreateStoreCommand('words_remote', { keyPath: ID, autoIncrement: false }),


			// configuration: '',
			new dbCommands.CreateStoreCommand('configuration', { keyPath: null, autoIncrement: false }),


			// logs: '++id, category, entityId'
			new dbCommands.CreateStoreCommand('logs', { keyPath: ID, autoIncrement: true }),
			new dbCommands.AddIndexCommand('logs', 'category', 'category', { unique: false }),
			new dbCommands.AddIndexCommand('logs', 'entityId', 'entityId', { unique: false }),

		],

	},

};

// export const wolfBaseDBFactory = (): WolfBaseDB => {

// 	return new WolfBaseDB({

// 		dbName: 'WolfBaseDB',
// 		tables: {

// 			// bookmarks
// 			bookmarks: 'id',
// 			bookmarks_sync: 'id',
// 			bookmarks_trash: '++, id, name',
// 			bookmarks_remote: 'id',
// 			bookmarks_clicks: 'id, current',

// 			// notes
// 			notes: 'id, name, parentId',
// 			notes_sync: 'id',
// 			notes_trash: '++, id, name',
// 			notes_remote: 'id',

// 			// note content
// 			note_content: 'id, name, content',
// 			note_content_sync: 'id',
// 			note_content_trash: '++, id, name',
// 			note_content_remote: 'id',

// 			// projects
// 			projects: 'id, name',
// 			projects_sync: 'id',
// 			projects_trash: '++, id, name',
// 			projects_remote: 'id',

// 			// quizEntries
// 			quiz_entries: 'id, name',
// 			quiz_entries_sync: 'id',
// 			quiz_entries_trash: '++, id, name',
// 			quiz_entries_remote: 'id',

// 			// quotes
// 			quotes: 'id, name',
// 			quotes_sync: 'id',
// 			quotes_trash: '++, id, name',
// 			quotes_remote: 'id',

// 			// project taks
// 			tasks: 'id, name',
// 			tasks_sync: 'id',
// 			tasks_trash: '++, id, name',
// 			tasks_remote: 'id',

// 			// words
// 			words: 'id, name',
// 			words_sync: 'id',
// 			words_trash: '++, id, name',
// 			words_remote: 'id',

// 			// configuration
// 			configuration: '',

// 			// logs
// 			logs: '++id, category, entityId'

// 		},
// 		version: 20

// 	});

// };

// export class WolfBaseDB {

// 	constructor(conf: DexieConfiguration) {

// 		super(conf.dbName);
// 		this.version(conf.version)
// 			.stores(conf.tables);

// 		this.on('ready', async (db) => {

// 			const defaults: Record<string, any> = DEFAULT_CONF_VALUES;
// 			const table = db.table(LocalRepositoryNames.configuration);

// 			// read configuration table
// 			const currentValues: Record<string, any> = {};
// 			await table.each((val, c) => currentValues[c.key] = val);

// 			// add new configuration properties
// 			for (let key in DEFAULT_CONF_VALUES) {

// 				if (!currentValues[key])
// 					await table.put(defaults[key], key);
// 				delete currentValues[key];

// 			}

// 			// delete obsolete table entries
// 			for (let key in currentValues)
// 				await table.delete(key);

// 		});

// 	}

// }

