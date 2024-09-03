import { AppEntities, Quote } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { QuoteLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieQuotesRepositoryImpl extends EntityLocalRepositoryImpl<Quote> implements QuoteLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntities.quote);
	}

	protected override newItemFromPartial(item: Partial<Quote>): Quote {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Quote>): Quote {

		const instance: Quote = {

			id,
			name: '',
			author: null,
			context: null

		};
		return { ...instance, ...item, id } as Quote;

	}

}
