import { BookmarksTable } from './tables/bookmarks.table';
import { DexieLocalStorageService } from './dexie.service';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';
import { ConfigurationTable } from './tables';

export const localStorageServiceFactory = (): DexieLocalStorageService => {

	const db: WolfBaseDB = wolfBaseDBFactory();
	return new DexieLocalStorageService(

		db,
		bookmarksTableFactory(db),
		configurationTableFactory(db),

		// notesTableFactory(db),
		// tasksTableFactory(db),
		// wordsTableFactory(db),
		// fastsTableFactory(db),
		// weightsTableFactory(db),
		// workoutsTableFactory(db)
	);

};

const bookmarksTableFactory = (wolfBaseDB?: WolfBaseDB): BookmarksTable => {

	return new BookmarksTable(wolfBaseDB || wolfBaseDBFactory());

};


const configurationTableFactory = (wolfBaseDB?: WolfBaseDB): ConfigurationTable => {

	return new ConfigurationTable(wolfBaseDB || wolfBaseDBFactory());

};
