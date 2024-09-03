import { FIRESTORE_VALUE, FirestoreConverter, AppEntityType } from '@lib';
import { FirestoreConfig, Project } from 'lib/models';
import { ProjectsRemoteRepository } from 'lib/repositories/remote/project-remote.repository';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class ProjectsFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Project> implements ProjectsRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.project,
			new ProjectFirestoreConverter()
		);
	}

}

class ProjectFirestoreConverter implements FirestoreConverter<Project> {

	toFirestore(entry: Project): Record<keyof Project, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Project, FIRESTORE_VALUE>;

		fields['name'] = { stringValue: entry.name };
		fields['status'] = { stringValue: entry.status };
		fields['start'] = { stringValue: entry.start };

		if (entry.description)
			fields['description'] = { stringValue: entry.description };
		else
			fields['description'] = { nullValue: null };

		if (entry.end)
			fields['end'] = { stringValue: entry.end };
		else
			fields['end'] = { nullValue: null };

		fields['tasks'] = {
			arrayValue: { values: [] }
		};

		return fields;

	}

	fromFirestore(entry: Project): Project {

		// validate incoming
		let { id, name, description, tasks, status, start, end } = entry;
		if (!id)
			throw new Error(`Firestore Project Entry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Project Entry: invalid 'name' value`);

		if (!status)
			throw new Error(`Firestore Project Entry: invalid 'status' value`);

		if (!start)
			throw new Error(`Firestore Project Entry: invalid 'start' value`);

		if (!Array.isArray(tasks))
			throw new Error(`Firestore Project Entry: invalid 'tasks' value`);

		const validated: Project = {

			id,
			name,
			status,
			start,
			description: description ?? null,
			end: end ?? null,
			tasks

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Project>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		// if (entry.dictionary)
		fields.add('description');

		// if (entry.tasks)
		fields.add('tasks');

		// if (entry.status)
		fields.add('status');

		// if (entry.start)
		fields.add('start');

		if (entry.end)
			fields.add('end');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
