import Dexie from 'dexie';
import { environment } from 'environments/environment';
import { CONF_KEYS, THEME, UUID, WolfBaseTableName } from 'lib/constants';
import { Bookmark, DexieConfiguration, EntityBase, IConflictData, ITrash } from 'lib/models';

class DEFAULT_CONF_VALUES {

	static theme: THEME = 'dark';
	static sidebarVisible = true;
	static syncWorkerActive = true;

}

export const wolfBaseDBFactory = (): WolfBaseDB => {

	return new WolfBaseDB({
		dbName: environment.dexie.dbName,
		tables: environment.dexie.tables,
		version: environment.dexie.version
	});

};

export class WolfBaseDB extends Dexie {

	configuration: Dexie.Table<string | boolean, string>;
	conflicts: Dexie.Table<IConflictData<EntityBase>, UUID>;
	trashcan: Dexie.Table<ITrash<EntityBase>, UUID>;

	bookmarks: Dexie.Table<Bookmark, UUID>;
	// notes: Dexie.Table<ILocalData<INote>, ID>;
	// tasks: Dexie.Table<ILocalData<ITaskList>, ID>;
	// words: Dexie.Table<ILocalData<IWord>, ID>;

	constructor(conf: DexieConfiguration) {

		super(conf.dbName);
		this.version(conf.version)
			.stores(conf.tables);

		this.configuration = this.table(WolfBaseTableName.configuration);
		this.conflicts = this.table(WolfBaseTableName.conflicts);
		this.trashcan = this.table(WolfBaseTableName.trashcan);

		this.bookmarks = this.table(WolfBaseTableName.bookmarks);
		// this.notes = this.table(KnobaTable.notes);
		// this.tasks = this.table(KnobaTable.tasks);
		// this.words = this.table(KnobaTable.words);

		this.on('populate', () => {

			this.configuration.put(DEFAULT_CONF_VALUES.syncWorkerActive, CONF_KEYS.syncWorkerActive);
			this.configuration.put(DEFAULT_CONF_VALUES.sidebarVisible, CONF_KEYS.sidebarVisible);
			this.configuration.put(DEFAULT_CONF_VALUES.theme, CONF_KEYS.theme);

		});

	}

}

