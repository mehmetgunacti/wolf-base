import {
	IBookmarksTable,
	ILocalStorageTable,
} from './local-storage-table.interface';
import { IKnobaEntity } from 'lib/constants';

interface ILocalStorageService {

	drop(): Promise<void>;
	getTable(tablename: string): ILocalStorageTable<IKnobaEntity>;

}

export abstract class LocalStorageService implements ILocalStorageService {

	constructor(
		public bookmarks: IBookmarksTable,
		// public notes: INotesTable,
		// public tasks: ITasksTable,
		// public words: IWordsTable,
		// public fasts: IFastsTable,
		// public weights: IWeightsTable,
		// public workouts: IWorkoutsTable
	) { }

	abstract drop(): Promise<void>;
	abstract getTable(tablename: string): ILocalStorageTable<IKnobaEntity>;

}
