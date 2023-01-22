import { BookmarksTable } from './tables/bookmarks.table';
import { NotesTable } from './tables/notes.table';
import { TasksTable } from './tables/tasks.table';
import { WordsTable } from './tables/words.table';
import { FastsTable } from './tables/fasts.table';
import { WeightsTable } from './tables/weights.table';
import { WorkoutsTable } from './tables/workouts.table';
import { DexieLocalStorageService } from './dexie.service';
import { KnobaDB, knobaDBFactory } from './knoba.database';

export const localStorageServiceFactory = (): DexieLocalStorageService => {

	const db: KnobaDB = knobaDBFactory();
	return new DexieLocalStorageService(

		db,
		bookmarksTableFactory(db),
		notesTableFactory(db),
		tasksTableFactory(db),
		wordsTableFactory(db),
		fastsTableFactory(db),
		weightsTableFactory(db),
		workoutsTableFactory(db)
	);

};

const bookmarksTableFactory = (knobaDB?: KnobaDB): BookmarksTable => {

	return new BookmarksTable(knobaDB || knobaDBFactory());

};

const notesTableFactory = (knobaDB?: KnobaDB): NotesTable => {

	return new NotesTable(knobaDB || knobaDBFactory());

};

const tasksTableFactory = (knobaDB?: KnobaDB): TasksTable => {

	return new TasksTable(knobaDB || knobaDBFactory());

};

const wordsTableFactory = (knobaDB?: KnobaDB): WordsTable => {

	return new WordsTable(knobaDB || knobaDBFactory());

};

const fastsTableFactory = (knobaDB?: KnobaDB): FastsTable => {

	return new FastsTable(knobaDB || knobaDBFactory());

};

const weightsTableFactory = (knobaDB?: KnobaDB): WeightsTable => {

	return new WeightsTable(knobaDB || knobaDBFactory());

};

const workoutsTableFactory = (knobaDB?: KnobaDB): WorkoutsTable => {

	return new WorkoutsTable(knobaDB || knobaDBFactory());

};

