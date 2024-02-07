import { SidebarState, Theme } from '@lib';
import { CONF_KEYS, LocalRepositoryNames } from 'lib/constants/database.constant';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';
import { ConfigurationLocalRepository } from 'lib/repositories/local';
import { WolfBaseDB } from '../wolfbase.database';
import { KeyValueLocalRepositoryImpl } from './key-value.table';

export class DexieConfigurationRepositoryImpl extends KeyValueLocalRepositoryImpl implements ConfigurationLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, LocalRepositoryNames.configuration)
	}

	async setSidebarState(state: SidebarState): Promise<void> {

		return await this.set(CONF_KEYS.sidebarState, state);

	}

	async setTheme(theme: Theme): Promise<void> {

		return await this.set(CONF_KEYS.theme, theme);

	}

	async setTitleLookupUrl(url: string): Promise<void> {

		return await this.set(CONF_KEYS.titleLookupUrl, url);

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

			sidebarState: map.get(CONF_KEYS.sidebarState) ?? null,
			theme: map.get(CONF_KEYS.theme) ?? null,
			firestoreConfig: map.get(CONF_KEYS.firestoreConfig) ?? null,
			titleLookupUrl: map.get(CONF_KEYS.titleLookupUrl) ?? null,
			popularBookmarks: map.get(CONF_KEYS.popularBookmarks) ?? null,
			pinnedNotes: map.get(CONF_KEYS.pinnedNotes) ?? null

		}
		return conf;

	}

}
