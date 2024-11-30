import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { TestSuite } from '@models/test-suite.model';
import { TestSuitesRemoteRepository } from '@repositories/remote/test-suite-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class TestSuitesFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<TestSuite> implements TestSuitesRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.testSuite,
			new TestSuiteFirestoreConverter()
		);
	}

}

class TestSuiteFirestoreConverter implements FirestoreConverter<TestSuite> {

	toFirestore(entry: TestSuite): Record<keyof TestSuite, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof TestSuite, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };
		fields[ 'tests' ] = {
			arrayValue: { values: [] }
		};

		return fields;

	}

	fromFirestore(entry: TestSuite): TestSuite {

		// validate incoming
		let { id, name, tests } = entry;
		if (!id)
			throw new Error(`Firestore TestSuite Entry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore TestSuite Entry: invalid 'name' value`);

		if (!Array.isArray(tests))
			throw new Error(`Firestore TestSuite Entry: invalid 'tests' value`);

		const validated: TestSuite = {

			id,
			name,
			tests

		};
		return validated;

	}

	toUpdateMask(entry: Partial<TestSuite>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		// if (entry.tests)
		fields.add('tests');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
