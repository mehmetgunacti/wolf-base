import { CONF_KEYS } from 'lib/constants/database.constant';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';
import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';
import { DEFAULT_CONF_VALUES } from '../wolfbase.database';

export class ConfigurationTableImpl extends KeyValueTableImpl implements ConfigurationTable {

	async setSidebarVisible(visible: boolean): Promise<void> {

		return await this.set(CONF_KEYS.sidebarVisible, visible);

	}

	async setTitleLookupUrl(url: string): Promise<void> {

		return await this.set(CONF_KEYS.titleLookupUrl, url);

	}

	async toggleTheme(): Promise<void> {

		return await this.toggle(CONF_KEYS.darkTheme);

	}

	async getFirestoreConfig(): Promise<FirestoreConfig | null> {

		return this.get(CONF_KEYS.firestoreConfig);

	}

	async setFirestoreConfig(config: FirestoreConfig): Promise<void> {

		await this.set(CONF_KEYS.firestoreConfig, config);

	}

	async getConfiguration(): Promise<Configuration> {

		const map: Map<string, any> = await this.dump();
		const conf: Configuration = {

			syncWorkerActive: map.get(CONF_KEYS.syncWorkerActive) ?? null,
			sidebarVisible: map.get(CONF_KEYS.sidebarVisible) ?? null,
			darkTheme: map.get(CONF_KEYS.darkTheme) ?? null,
			firestoreConfig: map.get(CONF_KEYS.firestoreConfig) ?? null,
			titleLookupUrl: map.get(CONF_KEYS.titleLookupUrl) ?? null,

		}
		return conf;

	}

}

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