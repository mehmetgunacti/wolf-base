import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Quote } from '@models/quote.model';
import { QuotesLocalRepository } from '@repositories/local/quote.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class QuotesLocalRepositoryImpl extends EntityLocalRepositoryImpl<Quote> implements QuotesLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.quotes,
			DbStore.quotes_sync,
			DbStore.quotes_remote,
			DbStore.quotes_trash,
			AppEntities.quote.label
		);
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
