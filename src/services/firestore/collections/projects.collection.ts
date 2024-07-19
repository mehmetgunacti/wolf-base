import { FIRESTORE_VALUE, FirestoreConverter, WolfEntity } from '@lib';
import { FirestoreConfig, Project, TaskGroup } from 'lib/models';
import { ProjectsRemoteRepository } from 'lib/repositories/remote/project-remote.repository';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class ProjectsFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Project> implements ProjectsRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			WolfEntity.project,
			new ProjectFirestoreConverter()
		);
	}

}

class ProjectTaskGroupFirestoreConverter implements FirestoreConverter<TaskGroup> {

	toFirestore(item: TaskGroup): Record<keyof TaskGroup, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof TaskGroup, FIRESTORE_VALUE>;
		fields['id'] = { stringValue: item.id };
		fields['name'] = { stringValue: item.name };
		return fields;

	}

	fromFirestore(item: TaskGroup): TaskGroup {

		// validate incoming
		let { id, name, tasks } = item;

		if (!id)
			throw new Error(`Firestore Project TaskGroup: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Project TaskGroup: invalid 'name' value`);

		const validated: TaskGroup = {

			id,
			name,
			tasks: []

		};
		return validated;

	}

	toUpdateMask(item: Partial<TaskGroup>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (item.id)
			fields.add('id');

		if (item.name)
			fields.add('name');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}

class ProjectFirestoreConverter implements FirestoreConverter<Project> {

	taskGroupsConverter: ProjectTaskGroupFirestoreConverter = new ProjectTaskGroupFirestoreConverter();

	toFirestore(entry: Project): Record<keyof Project, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Project, FIRESTORE_VALUE>;

		fields['name'] = { stringValue: entry.name };
		fields['status'] = { stringValue: entry.status };
		fields['start'] = { stringValue: entry.start };

		if (entry.description)
			fields['description'] = { stringValue: entry.description };
		else
			fields['description'] = { nullValue: null }

		if (entry.end)
			fields['end'] = { stringValue: entry.end };
		else
			fields['end'] = { nullValue: null }

		fields['taskGroups'] = {
			arrayValue: { values: entry.taskGroups.map(d => ({ mapValue: { fields: this.taskGroupsConverter.toFirestore(d) } })) }
		};

		return fields;

	}

	fromFirestore(entry: Project): Project {

		// validate incoming
		let { id, name, description, taskGroups, status, start, end } = entry;
		if (!id)
			throw new Error(`Firestore Project Entry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Project Entry: invalid 'name' value`);

		if (!status)
			throw new Error(`Firestore Project Entry: invalid 'status' value`);

		if (!start)
			throw new Error(`Firestore Project Entry: invalid 'start' value`);

		if (!Array.isArray(taskGroups))
			throw new Error(`Firestore Project Entry: invalid 'taskGroups' value`);

		const validated: Project = {

			id,
			name,
			status,
			start,
			description: description ?? null,
			end: end ?? null,
			taskGroups: taskGroups.map(tg => this.taskGroupsConverter.fromFirestore(tg))

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

		// if (entry.pronunciation)
		fields.add('taskGroups');

		// if (entry.status)
		fields.add('status');

		// if (entry.start)
		fields.add('start');

		if (entry.end)
			fields.add('end');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
