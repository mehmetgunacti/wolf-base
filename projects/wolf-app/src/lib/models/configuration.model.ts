export interface Configuration {

	sidebarVisible: boolean | null;
	syncWorkerActive: boolean | null;
	darkTheme: boolean | null;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;

}

export interface FirestoreConfig {

	apiKey: string;
	baseURL: string;
	projectId: string;

}