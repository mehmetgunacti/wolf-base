import { CONF_KEYS, DEFAULT_CONF_VALUES, LocalRepositoryNames } from '@constants/database.constant';
import { SidebarState } from '@constants/sidebar.constant';
import { Theme } from '@constants/theme.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Configuration, FirestoreConfig } from '@models/configuration.model';
import { ConfigurationLocalRepository } from '@repositories/local/configuration.repository';
import { KeyValueLocalRepositoryImpl } from './key-value.table';

export class ConfigurationLocalRepositoryImpl extends KeyValueLocalRepositoryImpl implements ConfigurationLocalRepository {

	constructor(db: IndexedDb) {
		super(db, LocalRepositoryNames.configuration);
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

	async setPinnedNotes(tags: string[]): Promise<void> {

		return await this.set(CONF_KEYS.pinnedNotes, tags);

	}

	async setPopularBookmarks(tags: string[]): Promise<void> {

		return await this.set(CONF_KEYS.popularBookmarks, tags);

	}

	async setQuotesRunning(running: boolean): Promise<void> {

		return await this.set(CONF_KEYS.quotesRunning, running);

	}

	async getFirestoreConfig(): Promise<FirestoreConfig | null> {

		return this.get(CONF_KEYS.firestoreConfig);

	}

	async setFirestoreConfig(config: FirestoreConfig): Promise<void> {

		await this.set(CONF_KEYS.firestoreConfig, config);

	}

	async getConfiguration(): Promise<Configuration> {

		const map = await this.db.dump(this.tablename);
		const conf: Configuration = {

			sidebarState: map[ CONF_KEYS.sidebarState ] ?? null,
			theme: map[ CONF_KEYS.theme ] ?? null,
			firestoreConfig: map[ CONF_KEYS.firestoreConfig ] ?? null,
			titleLookupUrl: map[ CONF_KEYS.titleLookupUrl ] ?? null,
			popularBookmarks: map[ CONF_KEYS.popularBookmarks ] ?? [],
			pinnedNotes: map[ CONF_KEYS.pinnedNotes ] ?? [],
			quotesRunning: map[ CONF_KEYS.quotesRunning ] ?? DEFAULT_CONF_VALUES.quotesRunning

		};
		return conf;

	}

}
