import { WolfBaseTableName } from 'lib/constants';
import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';
import { KeyValueTableImpl } from '../key-value.table';

export class ConfigurationTableImpl extends KeyValueTableImpl implements ConfigurationTable {

	constructor(db: WolfBaseDB) {
		super(db, WolfBaseTableName.configuration);
	}

}
