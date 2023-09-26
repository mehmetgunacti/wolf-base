import { ConfigurationTable, DEFAULT_CONF_VALUES } from '@lib';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';

export class MockConfigurationTableImpl implements ConfigurationTable {

	private conf: Configuration = {

		darkTheme: DEFAULT_CONF_VALUES.darkTheme,
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

		this.conf.darkTheme = !this.conf.darkTheme;

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
