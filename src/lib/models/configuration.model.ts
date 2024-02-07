import { SidebarState, Theme } from 'lib/constants';

export interface Configuration {

	sidebarState: SidebarState;
	theme: Theme;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;
	popularBookmarks: string[];
	pinnedNotest: string[];

}

export interface FirestoreConfig {

	apiKey: string;
	baseURL: string;
	projectId: string;

}
