import Dexie from 'dexie';
import { CONF_KEYS, DEFAULT_CONF_VALUES, LocalRepositoryNames } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { KBEntry, LogMessage, RemoteMetadata, SyncData } from 'lib/models';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { DexieConfiguration } from 'lib/models/database.model';

export const wolfBaseDBFactory = (): WolfBaseDB => {

	return new WolfBaseDB({

		dbName: 'WolfBaseDB',
		tables: {

			// bookmarks
			bookmarks: 'id',
			bookmarks_sync: 'id',
			bookmarks_trash: '++, id, name',
			bookmarks_remote: 'id',
			bookmarks_clicks: 'id, current',

			// knowledge base entry
			kb_entries: 'id',
			kb_entries_sync: 'id',
			kb_entries_trash: '++, id, name',
			kb_entries_remote: 'id',

			// knowledge base content
			kb_contents: 'id',
			kb_contents_sync: 'id',
			kb_contents_trash: '++, id, name',
			kb_contents_remote: 'id',

			// configuration
			configuration: '',

			// logs
			logs: '++id, category, entityId'

		},
		version: 2

	});

};

export class WolfBaseDB extends Dexie {

	// bookmarks
	bookmarks: Dexie.Table<Bookmark, UUID>;
	bookmarks_sync: Dexie.Table<SyncData, UUID>;
	bookmarks_remote: Dexie.Table<RemoteMetadata, UUID>;
	bookmarks_trash: Dexie.Table<Bookmark, number>;
	bookmarks_clicks: Dexie.Table<Click, UUID>;

	// knowledge base entries
	kb_entries: Dexie.Table<KBEntry, UUID>;
	kb_entries_sync: Dexie.Table<SyncData, UUID>;
	kb_entries_remote: Dexie.Table<RemoteMetadata, UUID>;
	kb_entries_trash: Dexie.Table<KBEntry, number>;

	// knowledge base contents
	kb_contents: Dexie.Table<string, UUID>;
	kb_contents_sync: Dexie.Table<SyncData, UUID>;
	kb_contents_remote: Dexie.Table<RemoteMetadata, UUID>;
	kb_contents_trash: Dexie.Table<string, number>;

	configuration: Dexie.Table<string | boolean, CONF_KEYS>;
	logs: Dexie.Table<LogMessage, number>;

	constructor(conf: DexieConfiguration) {

		super(conf.dbName);
		this.version(conf.version)
			.stores(conf.tables);

		this.bookmarks = this.table(LocalRepositoryNames.bookmarks);
		this.bookmarks_sync = this.table(LocalRepositoryNames.bookmarks_sync);
		this.bookmarks_remote = this.table(LocalRepositoryNames.bookmarks_remote);
		this.bookmarks_trash = this.table(LocalRepositoryNames.bookmarks_trash);
		this.bookmarks_clicks = this.table(LocalRepositoryNames.bookmarks_clicks);

		this.kb_entries = this.table(LocalRepositoryNames.kb_entries);
		this.kb_entries_sync = this.table(LocalRepositoryNames.kb_entries_sync);
		this.kb_entries_remote = this.table(LocalRepositoryNames.kb_entries_remote);
		this.kb_entries_trash = this.table(LocalRepositoryNames.kb_entries_trash);

		this.kb_contents = this.table(LocalRepositoryNames.kb_contents);
		this.kb_contents_sync = this.table(LocalRepositoryNames.kb_contents_sync);
		this.kb_contents_remote = this.table(LocalRepositoryNames.kb_contents_remote);
		this.kb_contents_trash = this.table(LocalRepositoryNames.kb_contents_trash);

		this.configuration = this.table(LocalRepositoryNames.configuration);
		this.logs = this.table(LocalRepositoryNames.logs);

		this.on('populate', () => {

			this.configuration.put(DEFAULT_CONF_VALUES.syncWorkerActive, CONF_KEYS.syncWorkerActive);
			this.configuration.put(DEFAULT_CONF_VALUES.sidebarVisible, CONF_KEYS.sidebarVisible);
			this.configuration.put(DEFAULT_CONF_VALUES.theme, CONF_KEYS.theme);

		});

	}

}

