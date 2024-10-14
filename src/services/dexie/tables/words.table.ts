import { AppEntities, UUID } from '@constants';
import { Definition, Word } from '@models';
import { WordLocalRepository } from '@repositories';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieWordsRepositoryImpl extends EntityLocalRepositoryImpl<Word> implements WordLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntities.word);
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
