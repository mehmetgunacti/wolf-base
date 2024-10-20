import { AppEntities, UUID } from '@constants';
import { IndexedDb } from '@libServices';
import { Quote } from '@models';
import { QuoteLocalRepository } from '@repositories';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class QuotesLocalRepositoryImpl extends EntityLocalRepositoryImpl<Quote> implements QuoteLocalRepository {

	constructor(db: IndexedDb) {
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
