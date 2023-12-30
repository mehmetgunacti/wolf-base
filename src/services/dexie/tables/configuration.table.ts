import { Theme, getNextTheme } from '@lib';
import { CONF_KEYS, DEFAULT_CONF_VALUES, LocalRepositoryNames } from 'lib/constants/database.constant';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';
import { KeyValueLocalRepositoryImpl } from './key-value.table';
import { WolfBaseDB } from '../wolfbase.database';
import { ConfigurationLocalRepository } from 'lib/repositories/local';

export class DexieConfigurationRepositoryImpl extends KeyValueLocalRepositoryImpl implements ConfigurationLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, LocalRepositoryNames.configuration)
	}

	async setSidebarVisible(visible: boolean): Promise<void> {

		return await this.set(CONF_KEYS.sidebarVisible, visible);

	}

	async setTitleLookupUrl(url: string): Promise<void> {

		return await this.set(CONF_KEYS.titleLookupUrl, url);

	}

	async toggleTheme(): Promise<void> {

		const modified = await this.db.configuration.where(':id').equals(CONF_KEYS.theme).modify(
			(currentValue: Theme, context) => { context.value = getNextTheme(currentValue); }
		);

		if (modified === 0)
			this.set(CONF_KEYS.theme, DEFAULT_CONF_VALUES.theme);

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
			theme: map.get(CONF_KEYS.theme) ?? null,
			firestoreConfig: map.get(CONF_KEYS.firestoreConfig) ?? null,
			titleLookupUrl: map.get(CONF_KEYS.titleLookupUrl) ?? null,

		}
		return conf;

	}

}
