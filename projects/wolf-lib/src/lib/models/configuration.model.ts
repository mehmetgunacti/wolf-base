import { Theme } from 'lib/constants';

export interface Configuration {

	sidebarVisible: boolean | null;
	syncWorkerActive: boolean | null;
	theme: Theme | null;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;

}

export interface FirestoreConfig {

	apiKey: string;
	baseURL: string;
	projectId: string;

}
