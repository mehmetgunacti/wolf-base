import { 	BookmarksTableInterface, ConfigurationTableInterface } from './local-storage-table.interface';

interface LocalStorageService {

	drop(): Promise<void>;
	// getTable(tablename: string): LocalStorageTable;

}

export abstract class LocalStorageServiceImpl implements LocalStorageService {

	constructor(
		public bookmarks: BookmarksTableInterface,
		public configuration: ConfigurationTableInterface
		// public notes: INotesTable,
		// public tasks: ITasksTable,
		// public words: IWordsTable,
		// public fasts: IFastsTable,
		// public weights: IWeightsTable,
		// public workouts: IWorkoutsTable
	) { }

	abstract drop(): Promise<void>;
	// abstract getTable(tablename: string): LocalStorageTable;

}
