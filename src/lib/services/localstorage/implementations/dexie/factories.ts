import { BookmarksTable } from './tables/bookmarks.table';
import { DexieLocalStorageService } from './dexie.service';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';

export const localStorageServiceFactory = (): DexieLocalStorageService => {

	const db: WolfBaseDB = wolfBaseDBFactory();
	return new DexieLocalStorageService(

		db,
		bookmarksTableFactory(db)
		// notesTableFactory(db),
		// tasksTableFactory(db),
		// wordsTableFactory(db),
		// fastsTableFactory(db),
		// weightsTableFactory(db),
		// workoutsTableFactory(db)
	);

};

const bookmarksTableFactory = (knobaDB?: WolfBaseDB): BookmarksTable => {

	return new BookmarksTable(knobaDB || wolfBaseDBFactory());

};


