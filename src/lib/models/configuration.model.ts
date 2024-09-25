import { SidebarAnimation, Theme } from 'lib/constants';

export interface Configuration {

	sidebarAnimation: SidebarAnimation;
	theme: Theme;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;
	popularBookmarks: string[];
	pinnedNotes: string[];
	quotesRunning: boolean;

}

export interface FirestoreConfig {

	apiKey: string;
	baseURL: string;
	projectId: string;

}
