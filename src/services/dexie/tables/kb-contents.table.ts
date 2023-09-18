import { KBContentsTable } from 'lib';
import { LocalTableNames } from 'lib/constants/database.constant';
import { WolfBaseDB } from '../wolfbase.database';
import { KeyValueTableImpl } from './key-value.table';

export class DexieKBContentsTableImpl extends KeyValueTableImpl implements KBContentsTable {

    constructor(db: WolfBaseDB) {
        super(db, LocalTableNames.kb_contents)
    }

}
