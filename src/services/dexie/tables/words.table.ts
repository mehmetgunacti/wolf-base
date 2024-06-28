import { WolfEntity, Word } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { WordLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieWordsRepositoryImpl extends EntityLocalRepositoryImpl<Word> implements WordLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.word);
	}

	protected override newItemFromPartial(item: Partial<Word>): Word {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Word>): Word {

		const instance: Word = {

			id,
			name: '',
			contexts: [],
			dictionary: null,
			pronunciation: null,
			definitions: []

		};
		return { ...instance, ...item, id } as Word;

	}

}
