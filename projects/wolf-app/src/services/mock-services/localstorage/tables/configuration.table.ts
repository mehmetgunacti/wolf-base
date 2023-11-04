import { ConfigurationRepository, DEFAULT_CONF_VALUES, getNextTheme } from '@lib';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';

export class MockConfigurationRepositoryImpl implements ConfigurationRepository {

	private conf: Configuration = {

		theme: DEFAULT_CONF_VALUES.theme,
		sidebarVisible: DEFAULT_CONF_VALUES.sidebarVisible,
		syncWorkerActive: DEFAULT_CONF_VALUES.syncWorkerActive,
		firestoreConfig: null,
		titleLookupUrl: null

	}

	async setSidebarVisible(visible: boolean): Promise<void> {

		this.conf.sidebarVisible = visible;

	}

	async setTitleLookupUrl(url: string): Promise<void> {

		this.conf.titleLookupUrl = url;

	}

	async toggleTheme(): Promise<void> {

		this.conf.theme = getNextTheme(this.conf.theme ?? DEFAULT_CONF_VALUES.theme);

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
