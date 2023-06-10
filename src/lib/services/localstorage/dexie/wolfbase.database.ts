import Dexie from 'dexie';
import { UUID } from 'lib/constants/common.constant';
import { CONF_KEYS, WolfBaseTableName } from 'lib/constants/database.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { DexieConfiguration } from 'lib/models/database.model';
import { Entity } from 'lib/models/entity.model';
import { ITrash } from 'lib/models/trashcan.model';

class DEFAULT_CONF_VALUES {

	static darkTheme = true;
	static sidebarVisible = true;
	static syncWorkerActive = true;

}

export const wolfBaseDBFactory = (): WolfBaseDB => {
	
	return new WolfBaseDB({
		dbName: 'WolfBaseDB',
		tables: {
			bookmarks: 'id, *tags, clicks',
			configuration: '',
			trashcan: 'id'
		},
		version: 1
	});

};

export class WolfBaseDB extends Dexie {

	bookmarks: Dexie.Table<Bookmark, UUID>;
	configuration: Dexie.Table<string | boolean, string>;
	trashcan: Dexie.Table<ITrash<Entity>, UUID>;

	constructor(conf: DexieConfiguration) {

		super(conf.dbName);
		this.version(conf.version)
			.stores(conf.tables);

		this.bookmarks = this.table(WolfBaseTableName.bookmarks);
		this.configuration = this.table(WolfBaseTableName.configuration);
		this.trashcan = this.table(WolfBaseTableName.trashcan);

		this.on('populate', () => {

			this.configuration.put(DEFAULT_CONF_VALUES.syncWorkerActive, CONF_KEYS.syncWorkerActive);
			this.configuration.put(DEFAULT_CONF_VALUES.sidebarVisible, CONF_KEYS.sidebarVisible);
			this.configuration.put(DEFAULT_CONF_VALUES.darkTheme, CONF_KEYS.darkTheme);

		});

	}

}

