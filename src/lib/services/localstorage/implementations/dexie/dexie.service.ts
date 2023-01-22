import { KnobaTable, IKnobaEntity } from 'blueprints/constants';
import { LocalStorageService } from '../../local-storage-service.interface';
import { KnobaDB } from './knoba.database';
import { IBookmarksTable, INotesTable, ITasksTable, IWordsTable, ILocalStorageTable, IFastsTable, IWeightsTable, IWorkoutsTable } from '../../local-storage-table.interface';

export class DexieLocalStorageService extends LocalStorageService {

	constructor(
		private db: KnobaDB,
		public bookmarks: IBookmarksTable,
		public notes: INotesTable,
		public tasks: ITasksTable,
		public words: IWordsTable,
		public fasts: IFastsTable,
		public weights: IWeightsTable,
		public workouts: IWorkoutsTable
	) {
		super(
			bookmarks,
			notes,
			tasks,
			words,
			fasts,
			weights,
			workouts
		);
	}


	async drop(): Promise<void> {

		await this.db.delete();

	}

	getTable(tablename: string): ILocalStorageTable<IKnobaEntity> {

		switch (tablename) {
			case KnobaTable.bookmarks: return this.bookmarks;
			case KnobaTable.notes: return this.notes;
			case KnobaTable.tasks: return this.tasks;
			case KnobaTable.words: return this.words;
		}
		throw new Error('name is not of type KnobaTable : [' + name + ']');

	}

}
