import { CONF_KEYS, ID, WolfBaseTable } from 'lib/constants';
import { IConflictData, IDexieConfiguration, Base, ITrash, Bookmark } from 'lib/models';
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

	configuration: Dexie.Table<string | number | boolean, string>;
	conflicts: Dexie.Table<IConflictData<Base>, ID>;
	trashcan: Dexie.Table<ITrash<Base>, ID>;

	bookmarks: Dexie.Table<Bookmark, ID>;
	// notes: Dexie.Table<ILocalData<INote>, ID>;
	// tasks: Dexie.Table<ILocalData<ITaskList>, ID>;
	// words: Dexie.Table<ILocalData<IWord>, ID>;

	constructor(definition: IDexieConfiguration) {

		super(definition.dbName);
		this.version(definition.version)
			.stores(definition.tables);

		this.configuration = this.table(WolfBaseTable.configuration);
		this.conflicts = this.table(WolfBaseTable.conflicts);
		this.trashcan = this.table(WolfBaseTable.trashcan);

		this.bookmarks = this.table(WolfBaseTable.bookmarks);
		// this.notes = this.table(KnobaTable.notes);
		// this.tasks = this.table(KnobaTable.tasks);
		// this.words = this.table(KnobaTable.words);

		this.configuration.put(true, CONF_KEYS.syncWorkerActive);
	}

}

