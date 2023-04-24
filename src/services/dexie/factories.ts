import { BookmarksTableImpl } from './tables/bookmarks.table';
import { DexieLocalStorageService } from './dexie.service';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';
import { ConfigurationTableImpl } from './tables';

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

const bookmarksTableFactory = (wolfBaseDB?: WolfBaseDB): BookmarksTableImpl => {

	return new BookmarksTableImpl(wolfBaseDB || wolfBaseDBFactory());

};


const configurationTableFactory = (wolfBaseDB?: WolfBaseDB): ConfigurationTableImpl => {

	return new ConfigurationTableImpl(wolfBaseDB || wolfBaseDBFactory());

};
