import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Definition, Word } from '@models/word.model';
import { WordLocalRepository } from '@repositories/local/word.repository';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class WordsLocalRepositoryImpl extends EntityLocalRepositoryImpl<Word> implements WordLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.words,
			DbStore.words_sync,
			DbStore.words_remote,
			DbStore.words_trash,
			AppEntities.word.label
		);
	}

	protected override newItemFromPartial(item: Partial<Word>): Word {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Word>): Word {

		const definitions: Definition[] = item.definitions ?? [];
		if (definitions.length < 1)
			throw Error('Create `Word`: definitions array is empty');

		const withIds = definitions.map(d => ({ ...d, id: uuidv4() }));

		const instance: Word = {

			id,
			name: '',
			contexts: [],
			dictionary: null,
			pronunciation: null,
			definitions: []

		};
		return { ...instance, ...item, id, definitions: withIds } as Word;

	}

	override async update(id: UUID, item: Partial<Word>): Promise<number> {

		// normally, entity IDs are set during entity creation
		// Definition is part of Word, but is not an Entity itself
		// new definitions can be added to 'definitions' array in Word update form
		// => IDs have to be set manually during Word update
		const updated: Partial<Word> = produce(
			item,
			draft => {

				draft.definitions?.filter(d => !d.id).forEach(d => d.id = uuidv4());

			}
		);
		return await super.update(id, updated);

	}

}
