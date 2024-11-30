import { Configuration } from '@models/configuration.model';
import { SidebarState } from './sidebar.constant';
import { Theme } from './theme.constant';

export enum DbStore {

	bookmarks = 'bookmarks',
	bookmarks_sync = 'bookmarks_sync',
	bookmarks_trash = 'bookmarks_trash',
	bookmarks_remote = 'bookmarks_remote',
	bookmarks_clicks = 'bookmarks_clicks',
	notes = 'notes',
	notes_sync = 'notes_sync',
	notes_trash = 'notes_trash',
	notes_remote = 'notes_remote',
	note_content = 'note_content',
	note_content_sync = 'note_content_sync',
	note_content_trash = 'note_content_trash',
	note_content_remote = 'note_content_remote',
	projects = 'projects',
	projects_sync = 'projects_sync',
	projects_trash = 'projects_trash',
	projects_remote = 'projects_remote',
	quiz_entries = 'quiz_entries',
	quiz_entries_sync = 'quiz_entries_sync',
	quiz_entries_trash = 'quiz_entries_trash',
	quiz_entries_remote = 'quiz_entries_remote',
	quotes = 'quotes',
	quotes_sync = 'quotes_sync',
	quotes_trash = 'quotes_trash',
	quotes_remote = 'quotes_remote',
	tasks = 'tasks',
	tasks_sync = 'tasks_sync',
	tasks_trash = 'tasks_trash',
	tasks_remote = 'tasks_remote',
	test_suites = 'test_suites',
	test_suites_sync = 'test_suites_sync',
	test_suites_trash = 'test_suites_trash',
	test_suites_remote = 'test_suites_remote',
	words = 'words',
	words_sync = 'words_sync',
	words_trash = 'words_trash',
	words_remote = 'words_remote',
	configuration = 'configuration',
	logs = 'logs'

}

export enum LocalRepositoryNames {

	configuration = 'configuration',
	logs = 'logs'

}

export const CONF_KEYS: { [ K in keyof Configuration ]: K } = {

	theme: 'theme',
	sidebarState: 'sidebarState',
	firestoreConfig: 'firestoreConfig',
	titleLookupUrl: 'titleLookupUrl',
	popularBookmarks: 'popularBookmarks',
	pinnedNotes: 'pinnedNotes',
	quotesRunning: 'quotesRunning'

};

export const DEFAULT_CONF_VALUES: Configuration = {

	theme: Theme.DARK,
	sidebarState: SidebarState.FULL,
	firestoreConfig: null,
	titleLookupUrl: null,
	popularBookmarks: [ '2-be-read', 'new', 'im-bored', 'news', 'shopping' ],
	pinnedNotes: [ 'java', 'todo', 'code' ],
	quotesRunning: false

};
