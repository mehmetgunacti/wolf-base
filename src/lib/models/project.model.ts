import { ProjectStatus, TaskPriority, TaskState, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { ISODateString, NameBase } from './id-base.model';

export interface Project extends Entity {

	description: string | null;
	taskGroups: TaskGroup[];
	status: ProjectStatus;
	start: ISODateString;
	end: ISODateString | null;

}

export interface TaskGroup extends NameBase {

	tasks: Task[];

}

export interface Task extends NameBase {

	taskGroupId: UUID;
	description: string | null;
	status: TaskState;
	priority: TaskPriority;
	optional: boolean;
	start: ISODateString;
	end: ISODateString | null;

}
