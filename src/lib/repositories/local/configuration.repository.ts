import { SidebarAnimation, Theme } from 'lib/constants';
import { Configuration, FirestoreConfig } from 'lib/models';

export interface ConfigurationLocalRepository {

	setSidebarAnimation(animation: SidebarAnimation): Promise<void>;
	setTitleLookupUrl(url: string): Promise<void>;
	setFirestoreConfig(config: FirestoreConfig): Promise<void>;
	setTheme(theme: Theme): Promise<void>;
	setPinnedNotes(tags: string[]): Promise<void>;
	setPopularBookmarks(tags: string[]): Promise<void>;
	setQuotesRunning(running: boolean): Promise<void>;

	getFirestoreConfig(): Promise<FirestoreConfig | null>;
	getConfiguration(): Promise<Configuration>;

}
