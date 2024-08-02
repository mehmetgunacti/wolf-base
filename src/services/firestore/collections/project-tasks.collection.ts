import { FIRESTORE_VALUE, FirestoreConverter, WolfEntity } from '@lib';
import { FirestoreConfig, Task } from 'lib/models';
import { TasksRemoteRepository } from 'lib/repositories/remote/project-task-remote.repository';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';
import { NameBaseFirestoreConverter } from './name-base.collection';

export class TasksFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Task> implements TasksRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			WolfEntity.task,
			new TaskFirestoreConverter()
		);
	}

}

class TaskFirestoreConverter implements FirestoreConverter<Task> {

	namebaseConverter = new NameBaseFirestoreConverter();

	toFirestore(entry: Task): Record<keyof Task, FIRESTORE_VALUE> {
		console.log(entry);
		const fields = {} as Record<keyof Task, FIRESTORE_VALUE>;

		fields['name'] = { stringValue: entry.name };

		fields['project'] = {
			mapValue: { fields: this.namebaseConverter.toFirestore(entry.project) }
		};

		fields['taskGroup'] = {
			mapValue: { fields: this.namebaseConverter.toFirestore(entry.taskGroup) }
		};

		if (entry.description)
			fields['description'] = { stringValue: entry.description };
		else
			fields['description'] = { nullValue: null };

		fields['status'] = { stringValue: entry.status };
		fields['priority'] = { stringValue: entry.priority };
		fields['optional'] = { booleanValue: entry.optional };
		fields['start'] = { stringValue: entry.start };

		if (entry.end)
			fields['end'] = { stringValue: entry.end };
		else
			fields['end'] = { nullValue: null };

		return fields;

	}

	fromFirestore(entry: Task): Task {

		// validate incoming
		let { id, name, project, taskGroup, description, status, priority, optional, start, end } = entry;

		if (!id)
			throw new Error(`Firestore Task: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Task: invalid 'name' value`);

		if (!project)
			throw new Error(`Firestore Task: invalid 'project' value`);

		if (!taskGroup)
			throw new Error(`Firestore Task: invalid 'taskGroup' value`);

		if (!status)
			throw new Error(`Firestore Task: invalid 'status' value`);

		if (!priority)
			throw new Error(`Firestore Task: invalid 'priority' value`);

		if (optional === undefined) // this field is boolean
			throw new Error(`Firestore Task: invalid 'optional' value`);

		if (!start)
			throw new Error(`Firestore Task: invalid 'start' value`);

		const validated: Task = {

			id,
			name,
			project,
			taskGroup,
			description: description ?? null,
			status,
			priority,
			optional,
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

		if (entry.taskGroup)
			fields.add('taskGroup');

		fields.add('description');

		if (entry.status)
			fields.add('status');

		if (entry.priority)
			fields.add('priority');

		if (entry.optional !== undefined)
			fields.add('optional');

		if (entry.start)
			fields.add('start');

		fields.add('end');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
