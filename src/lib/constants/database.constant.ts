import { Configuration } from 'lib/models';
import { SidebarState } from './sidebar.constant';
import { Theme } from './theme.constant';

export enum LocalRepositoryNames {

	// bookmarks
	bookmarks			= 'bookmarks',
	bookmarks_sync		= 'bookmarks_sync',
	bookmarks_remote	= 'bookmarks_remote',
	bookmarks_trash		= 'bookmarks_trash',
	bookmarks_clicks	= 'bookmarks_clicks',

	// notes
	notes				= 'notes',
	notes_sync			= 'notes_sync',
	notes_remote		= 'notes_remote',
	notes_trash			= 'notes_trash',

	// note content
	note_content		= 'note_content',
	note_content_sync	= 'note_content_sync',
	note_content_remote	= 'note_content_remote',
	note_content_trash	= 'note_content_trash',

	// projects
	projects			= 'projects',
	projects_sync		= 'projects_sync',
	projects_remote		= 'projects_remote',
	projects_trash		= 'projects_trash',

	// quiz entries
	quiz_entries		= 'quiz_entries',
	quiz_entries_sync	= 'quiz_entries_sync',
	quiz_entries_remote	= 'quiz_entries_remote',
	quiz_entries_trash	= 'quiz_entries_trash',

	// quotes
	quotes				= 'quotes',
	quotes_sync			= 'quotes_sync',
	quotes_remote		= 'quotes_remote',
	quotes_trash		= 'quotes_trash',

	// project tasks
	tasks				= 'tasks',
	tasks_sync			= 'tasks_sync',
	tasks_remote		= 'tasks_remote',
	tasks_trash			= 'tasks_trash',

	// words
	words				= 'words',
	words_sync			= 'words_sync',
	words_remote		= 'words_remote',
	words_trash			= 'words_trash',

	configuration		= 'configuration',
	logs				= 'logs'

}

export const CONF_KEYS: { [K in keyof Configuration]: K } = {

	theme: 'theme',
	sidebarState: 'sidebarState',
	firestoreConfig: 'firestoreConfig',
	titleLookupUrl: 'titleLookupUrl',
	popularBookmarks: 'popularBookmarks',
	pinnedNotes: 'pinnedNotes',
	quotesRunning: 'quotesRunning'

}

export const DEFAULT_CONF_VALUES: Configuration = {

	theme: Theme.DARK,
	sidebarState: SidebarState.FULL,
	firestoreConfig: null,
	titleLookupUrl: null,
	popularBookmarks: ['2-be-read', 'new', 'im-bored', 'news', 'shopping'],
	pinnedNotes: ['java', 'todo', 'code'],
	quotesRunning: false

}
