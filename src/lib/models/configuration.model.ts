export interface Configuration {

	sidebarVisible: boolean;
	syncWorkerActive: boolean;
	darkTheme: boolean;
	apiKey: string | null;
	baseURL: string | null;
	projectId: string | null;
	titleLookupUrl: string | null;

}

export interface FirestoreConfig extends Pick<Configuration, 'apiKey' | 'baseURL' | 'projectId'> { }