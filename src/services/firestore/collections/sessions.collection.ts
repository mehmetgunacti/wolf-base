import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Answer, Session } from '@models/test-suite.model';
import { SessionsRemoteRepository } from '@repositories/remote/session-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_MAP, FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';
import { NameBaseFirestoreConverter } from './name-base.collection';
import { UUID } from '@constants/common.constant';

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

export class AnswerFirestoreConverter implements FirestoreConverter<Answer> {

	toFirestore(item: Answer): Record<keyof Answer, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Answer, FIRESTORE_VALUE>;

		fields[ 'time' ] = { integerValue: item.time };
		fields[ 'choices' ] = {
			arrayValue: { values: item.choices.map(c => ({ booleanValue: c })) }
		};
		if (item.note)
			fields[ 'note' ] = { stringValue: item.note };
		else
			fields[ 'note' ] = { nullValue: null };

		return fields;

	}

	fromFirestore(entry: Answer): Answer {

		// validate incoming
		let { id, choices, time, note } = entry;

		if (!id)
			throw new Error(`Firestore Answer: invalid 'id' value`);

		if (!time)
			throw new Error(`Firestore Answer: invalid 'time' value`);

		if (!choices)
			throw new Error(`Firestore Answer: invalid 'choices' value`);

		if (!note)
			throw new Error(`Firestore Session Entry: invalid 'note' value`);

		const validated: Answer = {

			id,
			time,
			choices,
			note

		};
		return validated;

	}

	toUpdateMask(_: Answer): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<keyof Answer>();
		fields.add('time');
		fields.add('choices');
		fields.add('note');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}

class SessionFirestoreConverter implements FirestoreConverter<Session> {

	namebaseConverter = new NameBaseFirestoreConverter();
	answerConverter = new AnswerFirestoreConverter();

	toFirestore(entry: Session): Record<keyof Session, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Session, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };
		fields[ 'exam' ] = {
			mapValue: { fields: this.namebaseConverter.toFirestore(entry.exam) }
		};

		fields[ 'start' ] = { stringValue: entry.start };

		if (entry.end)
			fields[ 'end' ] = { stringValue: entry.end };
		else
			fields[ 'end' ] = { nullValue: null };

		fields[ 'answers' ] = {
			mapValue: {
				fields: Object
					.keys(entry.answers)
					.reduce((acc, key) => {

						acc[ key ] = { mapValue: { fields: this.answerConverter.toFirestore(entry.answers[ key ]) } };
						return acc;

					}, {} as Record<string, FIRESTORE_VALUE>)
			}
		};

		return fields;

	}

	fromFirestore(entry: Session): Session {

		// validate incoming
		let { id, exam, name, start, end, answers } = entry;
		if (!id)
			throw new Error(`Firestore Session Entry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Session Entry: invalid 'name' value`);

		if (!exam)
			throw new Error(`Firestore Session Entry: invalid 'exam' value`);

		if (!start)
			throw new Error(`Firestore Task: invalid 'start' value`);

		if (!answers)
			throw new Error(`Firestore Session Entry: invalid 'answers' value`);

		const validated: Session = {

			id,
			exam,
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

		if (entry.exam)
			fields.add('exam');

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
