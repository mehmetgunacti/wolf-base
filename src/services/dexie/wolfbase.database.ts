import Dexie from 'dexie';
import { CONF_KEYS, UUID, WolfBaseTableName } from 'lib/constants';
import { Bookmark, DexieConfiguration, EntityBase, ITrash } from 'lib/models';
import { initialConfState } from 'store/core';

class DEFAULT_CONF_VALUES {

	static darkTheme = initialConfState.darkTheme;
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
	trashcan: Dexie.Table<ITrash<EntityBase>, UUID>;

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

