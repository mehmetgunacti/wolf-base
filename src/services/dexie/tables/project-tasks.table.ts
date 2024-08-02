import { Task, TaskPriority, TaskState, WolfEntity, emptyNameBase } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { TaskLocalRepository } from 'lib/repositories/local/project-task.repository';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieTasksRepositoryImpl extends EntityLocalRepositoryImpl<Task> implements TaskLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.task);
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
			taskGroup: emptyNameBase(),
			description: null,
			status: TaskState.ongoing,
			priority: TaskPriority.normal,
			optional: false,
			start: new Date().toISOString(),
			end: null


		};
		return { ...instance, ...item, id } as Task;

	}

}
