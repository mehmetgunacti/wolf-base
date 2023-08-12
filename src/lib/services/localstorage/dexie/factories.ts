import { WolfBaseTableName } from '../../../constants/database.constant';
import { DexieLocalStorageService } from './dexie.service';
import { ClicksTableImpl, SyncLogTableImpl } from './tables';
import { BookmarksTableImpl } from './tables/bookmarks.table';
import { ConfigurationTableImpl } from './tables/configuration.table';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';

export const localStorageServiceFactory = (): DexieLocalStorageService => {

	const db: WolfBaseDB = wolfBaseDBFactory();
	return new DexieLocalStorageService(

		db,
		bookmarksTableFactory(db),
		configurationTableFactory(db),
		clicksTableFactory(db),
		syncLogTableFactory(db)

	);

};

const bookmarksTableFactory = (wolfBaseDB?: WolfBaseDB): BookmarksTableImpl => {

	return new BookmarksTableImpl(wolfBaseDB || wolfBaseDBFactory());

};


const configurationTableFactory = (wolfBaseDB?: WolfBaseDB): ConfigurationTableImpl => {

	return new ConfigurationTableImpl(
		wolfBaseDB || wolfBaseDBFactory(),
		WolfBaseTableName.configuration
	);

};

const clicksTableFactory = (wolfBaseDB?: WolfBaseDB): ClicksTableImpl => {

	return new ClicksTableImpl(
		wolfBaseDB || wolfBaseDBFactory()
	);

}

const syncLogTableFactory = (wolfBaseDB?: WolfBaseDB): SyncLogTableImpl => {

	return new SyncLogTableImpl(
		wolfBaseDB || wolfBaseDBFactory(),
		WolfBaseTableName.sync_log
	);

}