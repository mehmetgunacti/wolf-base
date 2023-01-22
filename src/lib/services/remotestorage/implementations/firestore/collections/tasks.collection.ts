import { RemoteCollection } from 'blueprints/constants';
import { ITaskList } from 'blueprints/models';
import { FirestoreTool, IFirestoreDocument, FIRESTORE_VALUE } from 'blueprints/tools';
import { AbstractFirestoreCollection } from '../firestore.collection';

export class TasksFirestoreCollection extends AbstractFirestoreCollection<ITaskList> {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.tasks);
	}

	protected createRequestBody(taskList: Partial<ITaskList>): IFirestoreDocument {

		const fields: { [key: string]: FIRESTORE_VALUE } = {};

		if (taskList.id)
			fields.id = { stringValue: taskList.id };

		if (taskList.title)
			fields.title = { stringValue: taskList.title };

		if (taskList.backgroundColor)
			fields.backgroundColor = { stringValue: taskList.backgroundColor };

		if (taskList.tags)
			fields.tags = {
				arrayValue: { values: taskList.tags.map(v => ({ stringValue: v })) }
			};

		if (taskList.tasks)
			fields.tasks = {
				arrayValue: {
					values:
						taskList.tasks.map(task => ({
							mapValue: {
								fields: {
									content: { stringValue: task.content },
									completed: { booleanValue: task.completed },
								}
							}
						}))
				}
			};

		return { fields };
	}

	protected createUpdateMask(taskList: ITaskList): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (taskList.title)
			fields.add('title');


		if (taskList.tasks)
			fields.add('tasks');

		if (taskList.tags)
			fields.add('tags');

		if (taskList.backgroundColor)
			fields.add('backgroundColor');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
