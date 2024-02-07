import { Configuration, FirestoreConfig } from 'lib/models';
import { SidebarState } from './sidebar.constant';
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

export const CONF_KEYS: { [K in keyof Configuration]: K } = {

	theme: 'theme',
	sidebarState: 'sidebarState',
	firestoreConfig: 'firestoreConfig',
	titleLookupUrl: 'titleLookupUrl',
	popularBookmarks: 'popularBookmarks',
	pinnedNotest: 'pinnedNotest'

}

export const DEFAULT_CONF_VALUES: Configuration = {

	theme: Theme.DARK,
	sidebarState: SidebarState.FULL,
	firestoreConfig: null,
	titleLookupUrl: null,
	popularBookmarks: ['news', 'shopping', 'shopping'],
	pinnedNotest: ['java', 'todo', 'code']

}
