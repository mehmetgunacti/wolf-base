import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Task } from '@models/project.model';
import { TasksRemoteRepository } from '@repositories/remote/project-task-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';
import { NameBaseFirestoreConverter } from './name-base.collection';

export class TasksFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Task> implements TasksRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.task,
			new TasksFirestoreConverter()
		);
	}

}

class TasksFirestoreConverter implements FirestoreConverter<Task> {

	namebaseConverter = new NameBaseFirestoreConverter();

	toFirestore(entry: Task): Record<keyof Task, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Task, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };

		fields[ 'project' ] = {
			mapValue: { fields: this.namebaseConverter.toFirestore(entry.project) }
		};

		fields[ 'tags' ] = {
			arrayValue: { values: entry.tags.map(v => ({ stringValue: v })) }
		};

		if (entry.description)
			fields[ 'description' ] = { stringValue: entry.description };
		else
			fields[ 'description' ] = { nullValue: null };

		fields[ 'status' ] = { stringValue: entry.status };
		fields[ 'priority' ] = { stringValue: entry.priority };
		fields[ 'category' ] = { stringValue: entry.category };
		fields[ 'start' ] = { stringValue: entry.start };

		if (entry.end)
			fields[ 'end' ] = { stringValue: entry.end };
		else
			fields[ 'end' ] = { nullValue: null };

		return fields;

	}

	fromFirestore(entry: Task): Task {

		// validate incoming
		let { id, name, project, tags, description, status, priority, category, start, end } = entry;

		if (!id)
			throw new Error(`Firestore Task: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Task: invalid 'name' value`);

		if (!project)
			throw new Error(`Firestore Task: invalid 'project' value`);

		if (!tags)
			throw new Error(`Firestore Task: invalid 'tags' value`);

		if (!status)
			throw new Error(`Firestore Task: invalid 'status' value`);

		if (!priority)
			throw new Error(`Firestore Task: invalid 'priority' value`);

		if (!category)
			throw new Error(`Firestore Task: invalid 'categeory' value`);

		if (!start)
			throw new Error(`Firestore Task: invalid 'start' value`);

		const validated: Task = {

			id,
			name,
			project,
			tags,
			description: description ?? null,
			status,
			priority,
			category,
			start,
			end: end ?? null

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Task>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		if (entry.project)
			fields.add('project');

		if (entry.tags)
			fields.add('tags');

		fields.add('description');

		if (entry.status)
			fields.add('status');

		if (entry.priority)
			fields.add('priority');

		if (entry.category)
			fields.add('category');

		if (entry.start)
			fields.add('start');

		fields.add('end');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
