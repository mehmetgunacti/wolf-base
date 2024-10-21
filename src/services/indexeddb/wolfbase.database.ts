import { DbStore } from '@constants';
import { IndexedDbConfiguration } from '@models';
import { dbCommands } from './db.command';

const ID = 'id';

export const indexedDbConfiguration: IndexedDbConfiguration = {

	dbName: 'WolfBaseDB',
	upgrades: {

		200: [

			// bookmarks: 'id',
			new dbCommands.CreateStoreCommand(DbStore.bookmarks, { keyPath: ID, autoIncrement: false }),

			// bookmarks_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.bookmarks_sync, { keyPath: ID, autoIncrement: false }),

			// bookmarks_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.bookmarks_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.bookmarks_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.bookmarks_trash, 'name', 'name', { unique: false }),

			// bookmarks_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.bookmarks_remote, { keyPath: ID, autoIncrement: false }),

			// bookmarks_clicks: 'id, current',
			new dbCommands.CreateStoreCommand(DbStore.bookmarks_clicks, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.bookmarks_clicks, 'current', 'current', { unique: false }),


			// notes: 'id, name, parentId',
			new dbCommands.CreateStoreCommand(DbStore.notes, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.notes, 'name', 'name', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.notes, 'parentId', 'parentId', { unique: false }),

			// notes_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.notes_sync, { keyPath: ID, autoIncrement: false }),

			// notes_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.notes_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.notes_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.notes_trash, 'name', 'name', { unique: false }),

			// notes_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.notes_remote, { keyPath: ID, autoIncrement: false }),


			// note_content: 'id, name, content',
			new dbCommands.CreateStoreCommand(DbStore.note_content, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.note_content, 'name', 'name', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.note_content, 'content', 'content', { unique: false }),

			// note_content_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.note_content_sync, { keyPath: ID, autoIncrement: false }),

			// note_content_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.note_content_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.note_content_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.note_content_trash, 'name', 'name', { unique: false }),

			// note_content_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.note_content_remote, { keyPath: ID, autoIncrement: false }),


			// projects: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.projects, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.projects, 'name', 'name', { unique: false }),

			// projects_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.projects_sync, { keyPath: ID, autoIncrement: false }),

			// projects_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.projects_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.projects_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.projects_trash, 'name', 'name', { unique: false }),

			// projects_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.projects_remote, { keyPath: ID, autoIncrement: false }),


			// quiz_entries: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.quiz_entries, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.quiz_entries, 'name', 'name', { unique: false }),

			// quiz_entries_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.quiz_entries_sync, { keyPath: ID, autoIncrement: false }),

			// quiz_entries_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.quiz_entries_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.quiz_entries_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.quiz_entries_trash, 'name', 'name', { unique: false }),

			// quiz_entries_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.quiz_entries_remote, { keyPath: ID, autoIncrement: false }),


			// quotes: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.quotes, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.quotes, 'name', 'name', { unique: false }),

			// quotes_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.quotes_sync, { keyPath: ID, autoIncrement: false }),

			// quotes_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.quotes_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.quotes_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.quotes_trash, 'name', 'name', { unique: false }),

			// quotes_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.quotes_remote, { keyPath: ID, autoIncrement: false }),


			// tasks: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.tasks, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.tasks, 'name', 'name', { unique: false }),

			// tasks_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.tasks_sync, { keyPath: ID, autoIncrement: false }),

			// tasks_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.tasks_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.tasks_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.tasks_trash, 'name', 'name', { unique: false }),

			// tasks_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.tasks_remote, { keyPath: ID, autoIncrement: false }),


			// words: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.words, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.words, 'name', 'name', { unique: false }),

			// words_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.words_sync, { keyPath: ID, autoIncrement: false }),

			// words_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.words_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.words_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.words_trash, 'name', 'name', { unique: false }),

			// words_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.words_remote, { keyPath: ID, autoIncrement: false }),


			// configuration: '',
			new dbCommands.CreateStoreCommand(DbStore.configuration, { keyPath: null, autoIncrement: false }),


			// logs: '++id, category, entityId'
			new dbCommands.CreateStoreCommand(DbStore.logs, { keyPath: ID, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.logs, 'category', 'category', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.logs, 'entityId', 'entityId', { unique: false }),

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

