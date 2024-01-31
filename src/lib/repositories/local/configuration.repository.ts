import { SidebarState, Theme } from 'lib/constants';
import { Configuration, FirestoreConfig } from 'lib/models';

export interface ConfigurationLocalRepository {

	setSidebarState(state: SidebarState): Promise<void>;
	setTitleLookupUrl(url: string): Promise<void>;
	setFirestoreConfig(config: FirestoreConfig): Promise<void>;
	setTheme(theme: Theme): Promise<void>;

	getFirestoreConfig(): Promise<FirestoreConfig | null>;
	getConfiguration(): Promise<Configuration>;

}
