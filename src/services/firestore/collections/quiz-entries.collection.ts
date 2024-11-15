import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { QuizEntry } from '@models/quiz.model';
import { QuizEntriesRemoteRepository } from '@repositories/remote/quiz-entry-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class QuizEntriesFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<QuizEntry> implements QuizEntriesRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.quizEntry,
			new QuizEntryFirestoreConverter()
		);
	}

}

class QuizEntryFirestoreConverter implements FirestoreConverter<QuizEntry> {

	toFirestore(entry: QuizEntry): Record<keyof QuizEntry, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof QuizEntry, FIRESTORE_VALUE>;
		fields[ 'name' ] = { stringValue: entry.name };
		fields[ 'level' ] = { stringValue: entry.level };
		fields[ 'next' ] = { integerValue: entry.next };
		fields[ 'question' ] = { stringValue: entry.question };
		return fields;

	}

	fromFirestore(entry: QuizEntry): QuizEntry {

		// validate incoming
		let { id, name, level, next, question } = entry;
		if (!id)
			throw new Error(`Firestore QuizEntry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore QuizEntry: invalid 'name' value`);

		if (!level)
			throw new Error(`Firestore QuizEntry: invalid 'level' value`);

		if (!next)
			throw new Error(`Firestore QuizEntry: invalid 'next' value`);

		if (!question)
			throw new Error(`Firestore QuizEntry: invalid 'question' value`);

		const validated: QuizEntry = {

			id,
			name,
			level,
			next,
			question

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
		fields.add('question');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
