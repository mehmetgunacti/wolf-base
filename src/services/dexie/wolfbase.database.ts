import { CONF_KEYS, DEFAULT_LANG, UUID, WolfBaseTableName } from 'lib/constants';
import { IConflictData, DexieConfiguration, EntityBase, ITrash, Bookmark } from 'lib/models';
import Dexie from 'dexie';
import { environment } from 'environments/environment';

export const wolfBaseDBFactory = (): WolfBaseDB => {

	return new WolfBaseDB({
		dbName: environment.dexie.dbName,
		tables: environment.dexie.tables,
		version: environment.dexie.version
	});

};

export class WolfBaseDB extends Dexie {

	configuration: Dexie.Table<string, string>;
	conflicts: Dexie.Table<IConflictData<EntityBase>, UUID>;
	trashcan: Dexie.Table<ITrash<EntityBase>, UUID>;

	bookmarks: Dexie.Table<Bookmark, UUID>;
	// notes: Dexie.Table<ILocalData<INote>, ID>;
	// tasks: Dexie.Table<ILocalData<ITaskList>, ID>;
	// words: Dexie.Table<ILocalData<IWord>, ID>;

	constructor(definition: DexieConfiguration) {

		super(definition.dbName);
		this.version(definition.version)
			.stores(definition.tables);

		this.configuration = this.table(WolfBaseTableName.configuration);
		this.conflicts = this.table(WolfBaseTableName.conflicts);
		this.trashcan = this.table(WolfBaseTableName.trashcan);

		this.bookmarks = this.table(WolfBaseTableName.bookmarks);
		// this.notes = this.table(KnobaTable.notes);
		// this.tasks = this.table(KnobaTable.tasks);
		// this.words = this.table(KnobaTable.words);

		this.configuration.put('true', CONF_KEYS.syncWorkerActive);
		this.configuration.put('true', CONF_KEYS.sidebarVisible);
		this.configuration.put(DEFAULT_LANG, CONF_KEYS.lang);

	}

}

