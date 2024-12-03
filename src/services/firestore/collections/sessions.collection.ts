import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Session } from '@models/test-suite.model';
import { SessionsRemoteRepository } from '@repositories/remote/session-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class SessionsFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Session> implements SessionsRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.session,
			new SessionFirestoreConverter()
		);
	}

}

class SessionFirestoreConverter implements FirestoreConverter<Session> {

	toFirestore(entry: Session): Record<keyof Session, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Session, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };
		fields[ 'examId' ] = { stringValue: entry.examId };

		fields[ 'start' ] = { stringValue: entry.start };

		if (entry.end)
			fields[ 'end' ] = { stringValue: entry.end };
		else
			fields[ 'end' ] = { nullValue: null };

		fields[ 'answers' ] = {
			arrayValue: { values: [] }
		};

		return fields;

	}

	fromFirestore(entry: Session): Session {

		// validate incoming
		let { id, examId, name, start, end, answers } = entry;
		if (!id)
			throw new Error(`Firestore Session Entry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Session Entry: invalid 'name' value`);

		if (!examId)
			throw new Error(`Firestore Session Entry: invalid 'examId' value`);

		if (!start)
			throw new Error(`Firestore Task: invalid 'start' value`);

		if (!Array.isArray(answers))
			throw new Error(`Firestore Session Entry: invalid 'answers' value`);

		const validated: Session = {

			id,
			examId,
			name,
			answers,
			start,
			end: end ?? null

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Session>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.examId)
			fields.add('examId');

		if (entry.name)
			fields.add('name');

		// if (entry.tests)
		fields.add('answers');

		if (entry.start)
			fields.add('start');

		fields.add('end');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
