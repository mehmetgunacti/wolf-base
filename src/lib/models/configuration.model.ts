export interface Configuration {

	sidebarVisible: boolean;
	syncWorkerActive: boolean;
	darkTheme: boolean;
	apiKey: string | null;
	baseURL: string | null;
	projectId: string | null;

}

export interface Credentials extends Pick<Configuration, 'apiKey' | 'baseURL' | 'projectId'> { }