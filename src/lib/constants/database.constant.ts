import { Theme } from './theme.constant';

export enum LocalRepositoryNames {

	// bookmarks
	bookmarks = 'bookmarks',
	bookmarks_sync = 'bookmarks_sync',
	bookmarks_remote = 'bookmarks_remote',
	bookmarks_trash = 'bookmarks_trash',
	bookmarks_clicks = 'bookmarks_clicks',

	// notes
	notes = 'notes',
	notes_sync = 'notes_sync',
	notes_remote = 'notes_remote',
	notes_trash = 'notes_trash',

	// note content
	note_content = 'note_content',
	note_content_sync = 'note_content_sync',
	note_content_remote = 'note_content_remote',
	note_content_trash = 'note_content_trash',

	configuration = 'configuration',
	logs = 'logs'

}

export enum CONF_KEYS {

	syncWorkerActive = 'syncWorkerActive',
	sidebarVisible = 'sidebarVisible',
	theme = 'theme',
	firestoreConfig = 'firestoreConfig',
	titleLookupUrl = 'titleLookupUrl'

}

export class DEFAULT_CONF_VALUES {

	static theme = Theme.DARK;
	static sidebarVisible = true;
	static syncWorkerActive = true;

}
