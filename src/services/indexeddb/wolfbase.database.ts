import { DbStore } from '@constants/database.constant';
import { IndexedDbConfiguration } from '@models/indexeddb.model';
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

		201: [

			// test_suites: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.test_suites, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.test_suites, 'name', 'name', { unique: false }),

			// test_suites_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.test_suites_sync, { keyPath: ID, autoIncrement: false }),

			// test_suites_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.test_suites_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.test_suites_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.test_suites_trash, 'name', 'name', { unique: false }),

			// test_suites_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.test_suites_remote, { keyPath: ID, autoIncrement: false }),

		],

		202: [

			// exams: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.exams, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.exams, 'name', 'name', { unique: false }),

			// exams_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.exams_sync, { keyPath: ID, autoIncrement: false }),

			// exams_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.exams_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.exams_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.exams_trash, 'name', 'name', { unique: false }),

			// exams_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.exams_remote, { keyPath: ID, autoIncrement: false }),

			// sessions: 'id, name',
			new dbCommands.CreateStoreCommand(DbStore.sessions, { keyPath: ID, autoIncrement: false }),
			new dbCommands.AddIndexCommand(DbStore.sessions, 'name', 'name', { unique: false }),

			// sessions_sync: 'id',
			new dbCommands.CreateStoreCommand(DbStore.sessions_sync, { keyPath: ID, autoIncrement: false }),

			// sessions_trash: '++, id, name',
			new dbCommands.CreateStoreCommand(DbStore.sessions_trash, { keyPath: null, autoIncrement: true }),
			new dbCommands.AddIndexCommand(DbStore.sessions_trash, 'id', 'id', { unique: false }),
			new dbCommands.AddIndexCommand(DbStore.sessions_trash, 'name', 'name', { unique: false }),

			// sessions_remote: 'id',
			new dbCommands.CreateStoreCommand(DbStore.sessions_remote, { keyPath: ID, autoIncrement: false }),

		]

	},

};
