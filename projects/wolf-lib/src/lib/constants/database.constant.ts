import { Theme } from './theme.constant';

export enum LocalTableNames {

	// bookmarks
	bookmarks = 'bookmarks',
	bookmarks_sync = 'bookmarks_sync',
	bookmarks_remote = 'bookmarks_remote',
	bookmarks_trash = 'bookmarks_trash',
	bookmarks_clicks = 'bookmarks_clicks',

	// knowledge base entries
	kb_entries = 'kb_entries',
	kb_entries_sync = 'kb_entries_sync',
	kb_entries_remote = 'kb_entries_remote',
	kb_entries_trash = 'kb_entries_trash',

	// knowledge base contents
	kb_contents = 'kb_contents',
	kb_contents_sync = 'kb_contents_sync',
	kb_contents_remote = 'kb_contents_remote',
	kb_contents_trash = 'kb_contents_trash',

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
