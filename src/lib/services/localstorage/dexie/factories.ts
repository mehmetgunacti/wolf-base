import { WolfBaseTableName } from '../../../constants/database.constant';
import { DexieLocalStorageService } from './dexie.service';
import { BookmarksTableImpl } from './tables/bookmarks.table';
import { ConfigurationTableImpl } from './tables/configuration.table';
import { KeyValueTableImpl } from './tables/key-value.table';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';

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

	return new ConfigurationTableImpl(
		new KeyValueTableImpl(
			wolfBaseDB || wolfBaseDBFactory(),
			WolfBaseTableName.configuration
		)
	);

};
