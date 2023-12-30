import { Configuration, FirestoreConfig } from 'lib/models';

export interface ConfigurationLocalRepository {

	setSidebarVisible(visible: boolean): Promise<void>;
	setTitleLookupUrl(url: string): Promise<void>;
	setFirestoreConfig(config: FirestoreConfig): Promise<void>;

	toggleTheme(): Promise<void>;

	getFirestoreConfig(): Promise<FirestoreConfig | null>;
	getConfiguration(): Promise<Configuration>;

}
