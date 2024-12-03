import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { TaskCategory, TaskPriority, TaskState } from '@constants/project.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { emptyNameBase } from '@models/id-base.model';
import { Task } from '@models/project.model';
import { TasksLocalRepository } from '@repositories/local/project-task.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class TasksLocalRepositoryImpl extends EntityLocalRepositoryImpl<Task> implements TasksLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.tasks,
			DbStore.tasks_sync,
			DbStore.tasks_remote,
			DbStore.tasks_trash,
			AppEntities.task.label
		);
	}

	protected override newItemFromPartial(item: Partial<Task>): Task {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Task>): Task {

		const instance: Task = {

			id,
			name: '',
			project: emptyNameBase(),
			description: null,
			status: TaskState.ongoing,
			priority: TaskPriority.medium,
			category: TaskCategory.bug,
			start: new Date().toISOString(),
			end: null,
			tags: []


		};
		return { ...instance, ...item, id } as Task;

	}

}
