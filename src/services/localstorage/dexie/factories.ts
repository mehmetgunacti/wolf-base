import { BookmarksTable, ClicksTable, ConfigurationTable, LogsTable, WolfBaseTableName } from 'lib';
import { DexieLocalStorageService } from './dexie.service';
import { ClicksTableImpl, LogsTableImpl } from './tables';
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
		logsTableFactory(db)
	);

};

const bookmarksTableFactory = (wolfBaseDB?: WolfBaseDB): BookmarksTable => {

	return new BookmarksTableImpl(wolfBaseDB || wolfBaseDBFactory());

};


const configurationTableFactory = (wolfBaseDB?: WolfBaseDB): ConfigurationTable => {

	return new ConfigurationTableImpl(
		wolfBaseDB || wolfBaseDBFactory(),
		WolfBaseTableName.configuration
	);

};

const clicksTableFactory = (wolfBaseDB?: WolfBaseDB): ClicksTable => {

	return new ClicksTableImpl(
		wolfBaseDB || wolfBaseDBFactory()
	);

}

const logsTableFactory = (wolfBaseDB?: WolfBaseDB): LogsTable => {

	return new LogsTableImpl(
		wolfBaseDB || wolfBaseDBFactory()
	);

}