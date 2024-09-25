import { DEFAULT_CONF_VALUES, SidebarState, Theme } from '@lib';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';
import { ConfigurationLocalRepository } from 'lib/repositories/local';

export class MockConfigurationLocalRepositoryImpl implements ConfigurationLocalRepository {

	private conf: Configuration = {

		theme: DEFAULT_CONF_VALUES.theme,
		sidebarState: DEFAULT_CONF_VALUES.sidebarState,
		firestoreConfig: null,
		titleLookupUrl: null,
		popularBookmarks: [],
		pinnedNotes: [],
		quotesRunning: true

	}

	async setPinnedNotes(tags: string[]): Promise<void> {

		throw new Error('Method not implemented.');

	}

	async setPopularBookmarks(tags: string[]): Promise<void> {

		throw new Error('Method not implemented.');

	}

	async setQuotesRunning(running: boolean): Promise<void> {

		this.conf.quotesRunning = running;

	}

	async setSidebarState(visible: SidebarState): Promise<void> {

		this.conf.sidebarState = visible;

	}

	async setTitleLookupUrl(url: string): Promise<void> {

		this.conf.titleLookupUrl = url;

	}

	async setTheme(theme: Theme): Promise<void> {

		this.conf.theme = theme;

	}

	async getConfiguration(): Promise<Configuration> {

		return this.conf;

	}

	async getFirestoreConfig(): Promise<FirestoreConfig | null> {

		return this.conf.firestoreConfig;

	}

	async setFirestoreConfig(config: FirestoreConfig): Promise<void> {

		this.conf.firestoreConfig = config;

	}

}
