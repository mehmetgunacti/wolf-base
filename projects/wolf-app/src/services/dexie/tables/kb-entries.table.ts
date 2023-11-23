import { KBEntry, WolfEntity } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';
import { KBEntriesLocalRepository } from 'lib/repositories/local';

export class DexieKBEntriesRepositoryImpl extends EntityLocalRepositoryImpl<KBEntry> implements KBEntriesLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.kb_entry);
	}

	protected override newItemFromPartial(item: Partial<KBEntry>): KBEntry {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<KBEntry>): KBEntry {

		const instance: KBEntry = {

			id,
			name: '',
			urls: [''],
			parentId: null,
			popular: false

		};
		return { ...instance, ...item, id } as KBEntry;

	}

}
