import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Exam } from '@models/test-suite.model';
import { ExamsRemoteRepository } from '@repositories/remote/exam-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class ExamsFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Exam> implements ExamsRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.exam,
			new ExamFirestoreConverter()
		);
	}

}

class ExamFirestoreConverter implements FirestoreConverter<Exam> {

	toFirestore(entry: Exam): Record<keyof Exam, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Exam, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };

		if (entry.description)
			fields[ 'description' ] = { stringValue: entry.description };

		fields[ 'questions' ] = {
			arrayValue: { values: [] }
		};

		return fields;

	}

	fromFirestore(entry: Exam): Exam {

		// validate incoming
		let { id, name, description, questions } = entry;
		if (!id)
			throw new Error(`Firestore Exam Entry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Exam Entry: invalid 'name' value`);

		if (!description)
			throw new Error(`Firestore Exam Entry: invalid 'description' value`);

		if (!Array.isArray(questions))
			throw new Error(`Firestore Exam Entry: invalid 'questions' value`);

		const validated: Exam = {

			id,
			name,
			description,
			questions

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Exam>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		if (entry.description)
			fields.add('description');

		// if (entry.tests)
		fields.add('questions');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
