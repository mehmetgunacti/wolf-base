import { ProjectStatus, TaskPriority, TaskState } from 'lib/constants';
import { Entity } from './entity.model';
import { ISODateString, NameBase } from './id-base.model';

export interface Project extends Entity {

	description: string | null;
	dueDate: ISODateString | null;
	taskGroups: TaskGroup[];
	status: ProjectStatus;

}

export interface TaskGroup extends NameBase {

	tasks: Task[];

}

export interface Task extends NameBase {

	description: string | null;
	dueDate: ISODateString | null;
	status: TaskState;
	priority: TaskPriority;

}
