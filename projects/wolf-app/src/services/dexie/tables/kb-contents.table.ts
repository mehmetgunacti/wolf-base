import { KBContentsRepository } from '@lib';
import { LocalRepositoryNames } from 'lib/constants/database.constant';
import { WolfBaseDB } from '../wolfbase.database';
import { KeyValueRepositoryImpl } from './key-value.table';

export class DexieKBContentsRepositoryImpl extends KeyValueRepositoryImpl implements KBContentsRepository {

    constructor(db: WolfBaseDB) {
        super(db, LocalRepositoryNames.kb_contents)
    }

    //	updated: new Date().toISOString(),

}
