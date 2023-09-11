import Dexie from 'dexie';
import { UUID, UUID_ISODate } from 'lib/constants/common.constant';
import { CONF_KEYS, WolfBaseTableName } from 'lib/constants/database.constant';
import { LogMessage, RemoteMetadata, SyncData } from 'lib/models';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { DexieConfiguration } from 'lib/models/database.model';

export class DEFAULT_CONF_VALUES {

	static darkTheme = true;
	static sidebarVisible = true;
	static syncWorkerActive = true;

}

export const wolfBaseDBFactory = (): WolfBaseDB => {

	return new WolfBaseDB({
		dbName: 'WolfBaseDB',
		tables: {

			// bookmarks
			bookmarks: 'id, *tags, clicks',
			bookmarks_sync: 'id',
			bookmarks_trash: '++, id, name',
			bookmarks_clicks: 'id, current',
			bookmarks_remote: 'id',

			// configuration
			configuration: '',

			// logs
			logs: '++id'

		},
		version: 14
	});

};

export class WolfBaseDB extends Dexie {

	bookmarks: Dexie.Table<Bookmark, UUID>;
	bookmarks_sync: Dexie.Table<SyncData, UUID>;
	bookmarks_remote: Dexie.Table<RemoteMetadata, UUID>;
	bookmarks_trash: Dexie.Table<Bookmark, number>;
	clicks: Dexie.Table<Click, UUID>;
	configuration: Dexie.Table<string | boolean, CONF_KEYS>;
	logs: Dexie.Table<LogMessage, number>;

	constructor(conf: DexieConfiguration) {

		super(conf.dbName);
		this.version(conf.version)
			.stores(conf.tables);

		this.bookmarks = this.table(WolfBaseTableName.bookmarks);
		this.bookmarks_sync = this.table(WolfBaseTableName.bookmarks_sync);
		this.bookmarks_remote = this.table(WolfBaseTableName.bookmarks_remote);
		this.bookmarks_trash = this.table(WolfBaseTableName.bookmarks_trash);
		this.clicks = this.table(WolfBaseTableName.bookmarks_clicks);
		this.configuration = this.table(WolfBaseTableName.configuration);
		this.logs = this.table(WolfBaseTableName.logs);

		this.on('populate', () => {

			this.configuration.put(DEFAULT_CONF_VALUES.syncWorkerActive, CONF_KEYS.syncWorkerActive);
			this.configuration.put(DEFAULT_CONF_VALUES.sidebarVisible, CONF_KEYS.sidebarVisible);
			this.configuration.put(DEFAULT_CONF_VALUES.darkTheme, CONF_KEYS.darkTheme);

		});

	}

}

