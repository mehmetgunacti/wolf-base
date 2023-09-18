import { ConfigurationTable } from 'lib';
import { CONF_KEYS, LocalTableNames } from 'lib/constants/database.constant';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';
import { KeyValueTableImpl } from './key-value.table';
import { WolfBaseDB } from '../wolfbase.database';

export class DexieConfigurationTableImpl extends KeyValueTableImpl implements ConfigurationTable {

	constructor(db: WolfBaseDB) {
		super(db, LocalTableNames.configuration)
	}

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
