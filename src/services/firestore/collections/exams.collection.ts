import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Exam, Question } from '@models/test-suite.model';
import { ExamsRemoteRepository } from '@repositories/remote/exam-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';
import { NameBaseFirestoreConverter } from './name-base.collection';

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

export class QuestionFirestoreConverter implements FirestoreConverter<Question> {

	toFirestore(item: Question): Record<keyof Question, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Question, FIRESTORE_VALUE>;

		fields[ 'id' ] = { stringValue: item.id };

		if (item.description)
			fields[ 'description' ] = { stringValue: item.description };
		else
			fields[ 'description' ] = { nullValue: null };

		fields[ 'answers' ] = {
			arrayValue: { values: item.answers.map(a => ({ booleanValue: a })) }
		};

		return fields;

	}

	fromFirestore(entry: Question): Question {

		// validate incoming
		let { id, description, answers } = entry;

		if (!id)
			throw new Error(`Firestore Question: invalid 'id' value`);

		if (description === undefined)
			throw new Error(`Firestore Question: invalid 'description' value`);

		if (!answers)
			throw new Error(`Firestore Question: invalid 'answers' value`);

		const validated: Question = {

			id,
			description: description ?? null,
			answers

		};
		return validated;

	}

	toUpdateMask(_: Question): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();
		fields.add('id');
		fields.add('description');
		fields.add('answers');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}

class ExamFirestoreConverter implements FirestoreConverter<Exam> {

	namebaseConverter = new NameBaseFirestoreConverter();
	questionConverter = new QuestionFirestoreConverter();

	toFirestore(entry: Exam): Record<keyof Exam, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Exam, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };
		fields[ 'testSuite' ] = {
			mapValue: { fields: this.namebaseConverter.toFirestore(entry.testSuite) }
		};

		if (entry.description)
			fields[ 'description' ] = { stringValue: entry.description };
		else
			fields[ 'description' ] = { nullValue: null };

		fields[ 'questions' ] = {
			arrayValue: { values: entry.questions.map(q => ({ mapValue: { fields: this.questionConverter.toFirestore(q) } })) }
		};

		return fields;

	}

	fromFirestore(entry: Exam): Exam {

		// validate incoming
		let { id, testSuite, name, description, questions } = entry;
		if (!id)
			throw new Error(`Firestore Exam Entry: invalid 'id' value`);

		if (!testSuite)
			throw new Error(`Firestore Exam Entry: invalid 'testSuite' value`);

		if (!name)
			throw new Error(`Firestore Exam Entry: invalid 'name' value`);

		if (description === undefined)
			throw new Error(`Firestore Exam Entry: invalid 'description' value`);

		if (!Array.isArray(questions))
			throw new Error(`Firestore Exam Entry: invalid 'questions' value`);

		const validated: Exam = {

			id,
			testSuite,
			name,
			description: description ?? null,
			questions

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Exam>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.testSuite)
			fields.add('testSuite');

		if (entry.name)
			fields.add('name');

		fields.add('description');

		// if (entry.tests)
		fields.add('questions');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
