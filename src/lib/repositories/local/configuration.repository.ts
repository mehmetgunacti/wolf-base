import { SidebarState } from '@constants/sidebar.constant';
import { Theme } from '@constants/theme.constant';
import { Configuration, FirestoreConfig } from '@models/configuration.model';

export interface ConfigurationLocalRepository {

	setSidebarState(state: SidebarState): Promise<void>;
	setTitleLookupUrl(url: string): Promise<void>;
	setFirestoreConfig(config: FirestoreConfig): Promise<void>;
	setTheme(theme: Theme): Promise<void>;
	setPinnedNotes(tags: string[]): Promise<void>;
	setPopularBookmarks(tags: string[]): Promise<void>;
	setQuotesRunning(running: boolean): Promise<void>;

	getFirestoreConfig(): Promise<FirestoreConfig | null>;
	getConfiguration(): Promise<Configuration>;

}
