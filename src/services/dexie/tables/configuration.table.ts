import { WolfBaseTableName } from 'lib/constants';
import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from '../dexie.table';
import { WolfBaseDB } from '../wolfbase.database';

export class ConfigurationTableImpl extends KeyValueTableImpl implements ConfigurationTable {

	constructor(db: WolfBaseDB) {
		super(db, WolfBaseTableName.configuration);
	}

}
