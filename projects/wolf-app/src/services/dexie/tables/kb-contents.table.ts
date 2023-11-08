import { LocalRepositoryNames } from 'lib/constants/database.constant';
import { WolfBaseDB } from '../wolfbase.database';
import { KeyValueLocalRepositoryImpl } from './key-value.table';
import { KBContentsLocalRepository } from 'lib/repositories/local';

export class DexieKBContentsRepositoryImpl extends KeyValueLocalRepositoryImpl implements KBContentsLocalRepository {

    constructor(db: WolfBaseDB) {
        super(db, LocalRepositoryNames.kb_contents)
    }

    //	updated: new Date().toISOString(),

}
