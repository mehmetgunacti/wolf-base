import { Configuration } from 'lib/models';
import { SidebarState } from './sidebar.constant';
import { Theme } from './theme.constant';

export enum LocalRepositoryNames {

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
