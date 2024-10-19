import { Configuration } from '@models';
import { SidebarState } from './sidebar.constant';
import { Theme } from './theme.constant';

export type TStore =
	'bookmarks'
	| 'bookmarks_sync'
	| 'bookmarks_trash'
	| 'bookmarks_remote'
	| 'bookmarks_clicks'
	| 'notes'
	| 'notes_sync'
	| 'notes_trash'
	| 'notes_remote'
	| 'note_content'
	| 'note_content_sync'
	| 'note_content_trash'
	| 'note_content_remote'
	| 'projects'
	| 'projects_sync'
	| 'projects_trash'
	| 'projects_remote'
	| 'quiz_entries'
	| 'quiz_entries_sync'
	| 'quiz_entries_trash'
	| 'quiz_entries_remote'
	| 'quotes'
	| 'quotes_sync'
	| 'quotes_trash'
	| 'quotes_remote'
	| 'tasks'
	| 'tasks_sync'
	| 'tasks_trash'
	| 'tasks_remote'
	| 'words'
	| 'words_sync'
	| 'words_trash'
	| 'words_remote'
	| 'configuration'
	| 'logs';

export enum LocalRepositoryNames {

	configuration = 'configuration',
	logs = 'logs'

}

export const CONF_KEYS: { [K in keyof Configuration]: K } = {

	theme				: 'theme',
	sidebarState		: 'sidebarState',
	firestoreConfig		: 'firestoreConfig',
	titleLookupUrl		: 'titleLookupUrl',
	popularBookmarks	: 'popularBookmarks',
	pinnedNotes			: 'pinnedNotes',
	quotesRunning		: 'quotesRunning'

}

export const DEFAULT_CONF_VALUES: Configuration = {

	theme				: Theme.DARK,
	sidebarState		: SidebarState.FULL,
	firestoreConfig		: null,
	titleLookupUrl		: null,
	popularBookmarks	: ['2-be-read', 'new', 'im-bored', 'news', 'shopping'],
	pinnedNotes			: ['java', 'todo', 'code'],
	quotesRunning		: false

}
