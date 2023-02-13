import { CONF_KEYS, ID, WolfBaseTable } from 'lib/constants';
import { IConflictData, IDexieConfiguration, Model, ISyncData, ITrash, Bookmark } from 'lib/models';
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
	conflicts: Dexie.Table<IConflictData<Model>, ID>;
	trashcan: Dexie.Table<ITrash<ISyncData<Model>>, ID>;

	bookmarks: Dexie.Table<ISyncData<Bookmark>, ID>;
	// notes: Dexie.Table<ISyncData<INote>, ID>;
	// tasks: Dexie.Table<ISyncData<ITaskList>, ID>;
	// words: Dexie.Table<ISyncData<IWord>, ID>;

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

