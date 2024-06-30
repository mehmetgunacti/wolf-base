import { FIRESTORE_VALUE, FirestoreConverter, WolfEntity } from '@lib';
import { FirestoreConfig, QuizEntry } from 'lib/models';
import { QuizEntriesRemoteRepository } from 'lib/repositories/remote';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class QuizEntriesFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<QuizEntry> implements QuizEntriesRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			WolfEntity.quizEntry,
			new QuizEntryFirestoreConverter()
		);
	}

}

class QuizEntryFirestoreConverter implements FirestoreConverter<QuizEntry> {

	toFirestore(entry: QuizEntry): Record<keyof QuizEntry, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof QuizEntry, FIRESTORE_VALUE>;
		fields['name'] = { stringValue: entry.name };
		fields['level'] = { stringValue: entry.level };
		fields['next'] = { integerValue: entry.next };
		return fields;

	}

	fromFirestore(entry: QuizEntry): QuizEntry {

		// validate incoming
		let { id, name, level, next } = entry;
		if (!id)
			throw new Error(`Firestore QuizEntry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore QuizEntry: invalid 'name' value`);

		const validated: QuizEntry = {

			id,
			name,
			level,
			next

		};
		return validated;

	}

	toUpdateMask(entry: Partial<QuizEntry>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		fields.add('name');
		fields.add('level');
		fields.add('next');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
