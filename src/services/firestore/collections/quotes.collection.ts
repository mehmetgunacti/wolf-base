import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Quote } from '@models/quote.model';
import { QuotesRemoteRepository } from '@repositories/remote/quote-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class QuotesFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Quote> implements QuotesRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.quote,
			new QuoteFirestoreConverter()
		);
	}

}

class QuoteFirestoreConverter implements FirestoreConverter<Quote> {

	toFirestore(entry: Quote): Record<keyof Quote, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Quote, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };

		if (entry.author)
			fields[ 'author' ] = { stringValue: entry.author };
		else
			fields[ 'author' ] = { nullValue: null };

		if (entry.context)
			fields[ 'context' ] = { stringValue: entry.context };
		else
			fields[ 'context' ] = { nullValue: null };

		return fields;

	}

	fromFirestore(entry: Quote): Quote {

		// validate incoming
		let { id, name, author, context } = entry;
		if (!id)
			throw new Error(`Firestore QuoteEntry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore QuoteEntry: invalid 'name' value`);

		const validated: Quote = {

			id,
			name,
			author: author ?? null,
			context: context ?? null

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Quote>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		fields.add('author');
		fields.add('context');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
