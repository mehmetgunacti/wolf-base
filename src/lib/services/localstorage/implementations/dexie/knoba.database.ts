import { CONF_KEYS, ID, KnobaTable } from 'blueprints/constants';
import { IConflictData, IDexieConfiguration, IModel, ISyncData, ITrash, IBookmark, INote, ITaskList, IWord } from 'blueprints/models';
import Dexie from 'dexie';
import { environment } from 'environments/environment';

export const knobaDBFactory = (): KnobaDB => {

	return new KnobaDB({
		dbName: environment.dexie.dbName,
		tables: environment.dexie.tables,
		version: environment.dexie.version
	});

};

export class KnobaDB extends Dexie {

	configuration: Dexie.Table<string | number | boolean, string>;
	conflicts: Dexie.Table<IConflictData<IModel>, ID>;
	trashcan: Dexie.Table<ITrash<ISyncData<IModel>>, ID>;

	bookmarks: Dexie.Table<ISyncData<IBookmark>, ID>;
	notes: Dexie.Table<ISyncData<INote>, ID>;
	tasks: Dexie.Table<ISyncData<ITaskList>, ID>;
	words: Dexie.Table<ISyncData<IWord>, ID>;

	constructor(definition: IDexieConfiguration) {

		super(definition.dbName);
		this.version(definition.version)
			.stores(definition.tables);

		this.configuration = this.table(KnobaTable.configuration);
		this.conflicts = this.table(KnobaTable.conflicts);
		this.trashcan = this.table(KnobaTable.trashcan);

		this.bookmarks = this.table(KnobaTable.bookmarks);
		this.notes = this.table(KnobaTable.notes);
		this.tasks = this.table(KnobaTable.tasks);
		this.words = this.table(KnobaTable.words);

		this.configuration.put(true, CONF_KEYS.syncWorkerActive);
	}

}

